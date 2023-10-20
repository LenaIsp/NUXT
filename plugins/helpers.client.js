import qs from 'qs';

export default defineNuxtPlugin(() => {
  console.log(qs)
  return {
    provide: {
      helpers: () => {
        const helpersFunction = {
          userAgentFindOne(arr) {
            var ua = navigator.userAgent;
            for (var i = 0; i < arr.length; i++) {
              if (Boolean(ua.match(new RegExp(arr[i], 'i')))) {
                return true;
              }
            }
            return false;
          },

          userAgentFindAll(arr) {
            var found = true;
            var ua = navigator.userAgent
            for (var i = 0; i < arr.length; i++) {
              if (ua.indexOf(arr[i]) == -1) {
                found = false;
                break;
              }
            }
            return found;
          },

          isIE() {
            var ua = window.navigator.userAgent;
            if (ua.indexOf('Edge/') > 0 ||
              ua.indexOf('Trident/') > 0 ||
              ua.indexOf('MSIE ') > 0) {
              return true;
            } else {
              return false;
            }
          },

          isMac() {
            var ua = navigator.platform;
            return /(Mac|iPhone|iPod|iPad)/i.test(ua);
          },

          checkForMobile() {
            return this.userAgentFindOne(['iPhone;', 'iPad;', 'iPod;', 'android', 'Mobile']);
          },

          checkForAndroid() {
            return this.userAgentFindOne(['android']);
          },

          checkForIpad() {
            return this.userAgentFindOne(['iPad;']);
          },

          checkForIphone() {
            return this.userAgentFindOne(['iPhone;']);
          },

          checkForTablet() {
            var sw = screen.width,
              sh = screen.height,
              dev_width = Math.min(sw, sh);

            return (
              this.checkForIpad() ||
              (this.userAgentFindOne(['Tablet']) && !this.userAgentFindOne(['Trident'])) ||
              this.userAgentFindOne(['Silk']) ||
              (this.checkForAndroid() && (dev_width >= 600)) ||
              (this.checkForMobile() && (dev_width >= 600))
            );
          },

          checkForPhone() {
            var sw = screen.width,
              sh = screen.height,
              dev_width = Math.min(sw, sh);

            return (
              this.checkForIphone() ||
              (this.checkForAndroid() && (dev_width < 600)) ||
              (this.checkForMobile() && (dev_width < 600))
            ) &&
              !this.checkForIpad();
          },

          checkForTabletMedia() {
            var wv = window.innerWidth;
            if (750 < wv && wv <= 1050) {
              return true;
            }
            return false;
          },

          checkForPhoneMedia() {
            var wv = window.innerWidth;
            if (wv <= 750) {
              return true;
            }
            return false;
          },

          isImageCached(img_url) {
            var imgEle = document.createElement('img');
            imgEle.src = img_url;
            return imgEle.complete;
          },

          get_browser_info() {
            var ua = navigator.userAgent, tem,
              M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
              tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
              return { name: 'IE', version: (tem[1] || '') };
            }
            if (M[1] === 'Chrome') {
              tem = ua.match(/\bOPR\/(\d+)/);
              if (tem != null) {
                return { name: 'Opera', version: tem[1] };
              }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) {
              M.splice(1, 1, tem[1]);
            }
            return {
              name: M[0],
              version: M[1],
            };
          },

          getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
          },

          declension(num, expressions) {
            var result;
            var count = num % 100;
            if (count >= 5 && count <= 20) {
              result = expressions['2'];
            } else {
              count = count % 10;
              if (count == 1) {
                result = expressions['0'];
              } else if (count >= 2 && count <= 4) {
                result = expressions['1'];
              } else {
                result = expressions['2'];
              }
            }
            return result;
          },

          getEndingByDigit(arr, digit) {
            digit = digit | 0;
            digit = digit % 100;

            var digit_text = ((typeof arr[2] !== 'undefined') ? arr[2] : '');
            if (digit < 10 || 20 < digit) {
              if (digit % 10 == 2 || digit % 10 == 3 || digit % 10 == 4) {
                digit_text = ((typeof arr[1] !== 'undefined') ? arr[1] : '');
              } else if (digit % 10 == 1) {
                digit_text = ((typeof arr[0] !== 'undefined') ? arr[0] : '');
              }
            }

            return digit_text;
          },

          formatBytes(a, b) {
            if (0 == a) return '0 Bytes';
            var c = 1024, d = b || 2, e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
              f = Math.floor(Math.log(a) / Math.log(c));
            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
          },

          scrollToElement(element, { duration = 300, offset = 0 } = {}) {
            var to = (window.scrollY || document.documentElement.scrollTop) + (element ? element.getBoundingClientRect().top : 0) + offset,
              start = window.scrollY || document.documentElement.scrollTop,
              change = to - start,
              currentTime = 0,
              increment = 20;

            var easeInOutQuad = function (t, b, c, d) {
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
            };

            var animateScroll = function () {
              currentTime += increment;
              var val = easeInOutQuad(currentTime, start, change, duration);

              if (window.scroll) {
                window.scroll(0, val);
              } else {
                document.documentElement.scrollTop = val;
              }

              if (currentTime < duration) {
                setTimeout(animateScroll, increment);
              }
            };
            animateScroll();
          },

          scrollToTop(duration = 300) {
            this.scrollToElement(document.getElementsByTagName('body')[0], { duration });
          },

          scrollToElementInBlock(parent, element, { duration = 300, offset = 0 } = {}) {
            var to = parent.scrollTop + element.offsetTop,
              start = parent.scrollTop,
              change = to - start,
              currentTime = 0,
              increment = 20;

            var easeInOutQuad = function (t, b, c, d) {
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
            };

            var animateScroll = function () {
              currentTime += increment;
              var val = easeInOutQuad(currentTime, start, change, duration);

              parent.scrollTop = val;

              if (currentTime < duration) {
                setTimeout(animateScroll, increment);
              }
            };
            animateScroll();
          },

          throttle(callback, delay) {
            var last;
            var timer;
            return function () {
              var context = this;
              var now = +new Date();
              var args = arguments;
              if (last && now < last + delay) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                  last = now;
                  callback.apply(context, args);
                }, delay);
              } else {
                last = now;
                callback.apply(context, args);
              }
            };
          },

          number_format(number, decimals, dec_point, thousands_sep) {
            var i, j, kw, kd, km;

            // input sanitation & defaults
            if (isNaN(decimals = Math.abs(decimals))) {
              decimals = 2;
            }
            if (dec_point == undefined) {
              dec_point = ',';
            }
            if (thousands_sep == undefined) {
              thousands_sep = '.';
            }

            i = parseInt(number = (+number || 0).toFixed(decimals)) + '';

            if ((j = i.length) > 3) {
              j = j % 3;
            } else {
              j = 0;
            }

            km = (j ? i.substr(0, j) + thousands_sep : '');
            kw = i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands_sep);
            kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : '');

            return km + kw + kd;
          },

          formatPhoneNumber(phone) {
            //normalize string and remove all unnecessary characters
            var _phone = (phone || '').replace(/[^\d]/g, '');

            //check if number length equals to 10
            if (_phone.length == 11) {
              //reformat and return phone number
              return _phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
            }

            return phone;
          },

          simplifyPhoneNumber(phone) {
            //normalize string and remove all unnecessary characters
            phone = (phone || '').replace(/[^\d]/g, '');

            if (phone.length > 11) {
              phone = phone.slice(-11);
            }

            return phone;
          },

          formatDateFromDMYtoYMD(date_str) {
            date_str = date_str || '';
            date_str = date_str + '';
            return date_str.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1');
          },

          brakeDoubleClick: {
            tags: {},
            isRunning: function (tag, time) {
              var that = this;

              if (that.tags[tag]) {
                return true;
              } else {
                that.tags[tag] = true;
                time = typeof time !== 'undefined' ? time : 1000;

                setTimeout(function () {
                  that.tags[tag] = false;
                }, time);

                return false;
              }
            },
            end: function (tag, time) {
              var that = this;

              if (that.tags[tag]) {
                time = typeof time !== 'undefined' ? time : 1000;
                setTimeout(function () {
                  that.tags[tag] = false;
                }, time);
              }
            },
          },

          parse_query_string(query) {
            if (!query) {
              return {};
            }

            if (query[0] == '?') {
              query = query.substr(1);
            }

            var vars = query.split('&');
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split('=');
              var key = decodeURIComponent(pair[0]).toLowerCase();
              var value = decodeURIComponent(pair[1]);
              // If first entry with this name
              if (typeof query_string[key] === 'undefined') {
                query_string[key] = decodeURIComponent(value);
                // If second entry with this name
              } else if (typeof query_string[key] === 'string') {
                var arr = [query_string[key], decodeURIComponent(value)];
                query_string[key] = arr;
                // If third or later entry with this name
              } else {
                query_string[key].push(decodeURIComponent(value));
              }
            }
            return query_string;
          },

          share(network, link, callback) {
            switch (network) {
              case 'vk':
                sharePopup('https://vk.com/share.php?url=' +
                  link, 550, 300, callback);
                break;
              case 'fb':
                sharePopup(
                  'https://www.facebook.com/sharer/sharer.php?u=' +
                  link, 550, 300, callback);
                break;
              case 'tw':
                sharePopup(
                  'https://twitter.com/intent/tweet?original_referer=' +
                  link + '&tw_p=tweetbutton&url=' + link, 550, 300, callback);
                break;
              case 'ok':
                sharePopup(
                  'https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview&st.shareUrl=' +
                  link, 550, 300, callback);
                break;
              case 'tg':
                sharePopup('https://telegram.me/share/url?url=' +
                  link, 550, 300, callback);
                break;
            }

            function sharePopup(url, width, height, callback) {
              if (!width) width = 400;
              if (!height) height = 400;

              let share_window = window.open(url, '_blank',
                'height=' + height + ',width=' + width +
                ',menubar=no,toolbar=no,location=no');
              let watch_timer = setInterval(function () {
                if (share_window.closed) {
                  clearInterval(watch_timer);
                  if (typeof callback != 'undefined') {
                    callback();
                  }
                  return;
                }
              }, 200);
            }
          },

          syncFilterData(filterData, query, filterDataDefault) {
            let newFilterData = JSON.parse(JSON.stringify(filterData));
            query = qs.parse(query);

            Object.keys(filterData).forEach(key => {
              const filterDataKey = filterData[key],
                queryKey = query[key],
                filterDataDefaultKey = filterDataDefault[key];

              if (queryKey) {
                if (filterDataKey && typeof filterDataKey === 'object'
                  && !('length' in filterDataKey)) {

                  Object.keys(filterDataKey).forEach(keyInner => {
                    const filterDataKeyInner = filterDataKey[keyInner],
                      queryKeyInner = queryKey[keyInner],
                      filterDataDefaultKeyInner = filterDataDefaultKey[keyInner];

                    if (queryKeyInner) {
                      if (filterDataKeyInner && typeof filterDataKeyInner === 'object'
                        && !('length' in filterDataKeyInner)) {

                        newFilterData[key][keyInner] = {
                          ...filterDataDefaultKeyInner,
                          ...filterDataKeyInner,
                          ...queryKeyInner,
                        };

                      } else {
                        newFilterData[key][keyInner] = queryKeyInner;
                      }
                    } else {
                      newFilterData[key][keyInner] = JSON.parse(JSON.stringify(filterDataDefaultKeyInner));
                    }
                  });

                } else {
                  newFilterData[key] = queryKey;
                }
              } else {
                newFilterData[key] = JSON.parse(JSON.stringify(filterDataDefaultKey));
              }
            });

            return newFilterData;
          },

          preloadImages(urls, allImagesLoadedCallback) {
            let loadedCounter = 0;
            let toBeLoadedNumber = urls.length;
            urls.forEach(url => {
              preloadImage(url, () => {
                loadedCounter++;
                if (loadedCounter == toBeLoadedNumber || loadedCounter > toBeLoadedNumber) allImagesLoadedCallback();
              });
            });

            function preloadImage(url, anImageLoadedCallback) {
              let img = new Image();
              img.onload = anImageLoadedCallback;
              img.src = url;
            }
          },

        };

        return helpersFunction
      }
    }
  }
})
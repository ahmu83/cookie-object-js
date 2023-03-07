'use strict';

/**
 * A factory function for storing key:value object data in a cookie
 *
 * 
 * @param  string cookieName Name of the cookie
 * @return object cookieName Name of the cookie
 */
function CookieData(cookieName) {

  if ( typeof cookieName !== 'string' ) {

    throw new Error('cookieName has to be a type of string.');

  }

  return {

    /**
     * Set an item or whole object in the cookieName
     * 
     * @param  string|object itemName
     * @param  mixed         itemValue
     * @return mixed
     */
    set(itemName = null, itemValue = null) {

      if ( typeof itemName === 'object' ) {

        try {

          var cookieDataStr = JSON.stringify(itemName);
          var cookieDataStrLength = cookieDataStr.length;

          if ( cookieDataStrLength >= 4000 ) {

            throw new Error('Reaching cookie size limit');

          }

          this.setCookieValue(cookieDataStr);

        } catch(error) {

          throw new Error(error);

        }

        return this.get();

      } else if ( typeof itemName === 'string' || typeof itemName === 'number' ) {

        return this.setItem(itemName, itemValue);

      }

    },

    /**
     * Set an item in the "cookieName" cookie object
     * 
     * @param string itemName
     * @param mixed  itemValue
     * @return mixed
     */
    setItem(itemName, itemValue) {

      if ( typeof itemName === 'string' || typeof itemName === 'number' ) {

        var cookieData = this.get();

        cookieData[itemName] = itemValue;

        this.set(cookieData);

        return this.getItem(itemName);

      }

      return null;

    },

    /**
     * Get an item or all data from the "cookieName" cookie object
     * 
     * @param  string itemName
     * @return mixed
     */
    get(itemName = null) {

      var cookieData = this.getCookieValue(cookieName);

      if ( itemName === null ) {

        if ( !cookieData || typeof cookieData === 'undefined' ) {

          return {};

        }

        try {

          return JSON.parse(cookieData);

        } catch (e) {

          return {};

        }

      } else if ( typeof itemName === 'string' || typeof itemName === 'number' ) {

        return this.getItem(itemName);

      }

      return null;

    },

    /**
     * Get an item from the "cookieName" cookie object
     * 
     * @param  string itemName
     * @return mixed
     */
    getItem(itemName) {

      if ( typeof itemName === 'string' || typeof itemName === 'number' ) {

        var cookieData = this.get();

        return ( typeof cookieData[itemName] === 'undefined' ? null : cookieData[itemName] );

      } else {

        return null;

      }

    },

    /**
     * Remove an item from the "cookieName" cookie object
     * 
     * @param  string itemName
     * @return mixed
     */
    removeItem(itemName) {

      if ( typeof itemName === 'string' || typeof itemName === 'number' ) {

        var cookieData = this.get();

        if ( typeof cookieData[itemName] !== 'undefined' ) {

          delete cookieData[itemName];

          this.set(cookieData);

          return true;

        }

        return null;

      } else {

        return null;

      }

    },

    /**
     * Reset the "cookieName" cookie object or an empty object
     * 
     * @return mixed
     */
    reset(defaultData = {}) {

      this.set(defaultData);

      return this.get();

    },

    setCookieValue(cookieValue, cookieDays = false, cookiePath = '/') {

      var expires;

      if (cookieDays) {

        var date = new Date();

        date.setTime(date.getTime() + (cookieDays * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();

      } else { // session only cookie

        expires = '';

      }

      document.cookie = cookieName + '=' + cookieValue + expires + '; path=' + cookiePath;

    },

    getCookieValue() {

      if (document.cookie.length > 0) {

        var start, end;

        start = document.cookie.indexOf(cookieName + '=');

        if (start != -1) {

          start = start + cookieName.length + 1;

          var end = document.cookie.indexOf(';', start);

          if (end == -1) {

            end = document.cookie.length;

          }

          return unescape(document.cookie.substring(start, end));

        }

      }

      return null;

    },

    removeCookie(cookiePath = '/') {

      this.set(cookieName, '', -1, cookiePath);

    },

  }

}


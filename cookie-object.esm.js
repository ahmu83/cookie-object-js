'use strict';

/**
 * A factory function for storing key:value object data in a cookie
 * 
 * @param  string cookieName Name of the cookie
 * @return object cookieName Name of the cookie
 */
export function cookieObject(cookieName, cookieDays = false, cookiePath = '/') {

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

          var cookieObjectStr = JSON.stringify(itemName);
          var cookieObjectStrLength = cookieObjectStr.length;

          if ( cookieObjectStrLength >= 4000 ) {

            throw new Error('Reaching cookie size limit');

          }

          this.setCookieValue(cookieObjectStr);

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

        var cookieObject = this.get();

        cookieObject[itemName] = itemValue;

        this.set(cookieObject);

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

      var cookieObject = this.getCookieValue(cookieName);

      if ( itemName === null ) {

        if ( !cookieObject || typeof cookieObject === 'undefined' ) {

          return {};

        }

        try {

          return JSON.parse(cookieObject);

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

        var cookieObject = this.get();

        return ( typeof cookieObject[itemName] === 'undefined' ? null : cookieObject[itemName] );

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

        var cookieObject = this.get();

        if ( typeof cookieObject[itemName] !== 'undefined' ) {

          delete cookieObject[itemName];

          this.set(cookieObject);

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

    setCookieValue(cookieValue) {

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

    removeCookie() {

      this.set(cookieName, '', -1, cookiePath);

    },

  }

}
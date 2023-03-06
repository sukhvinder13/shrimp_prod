(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-admin-layout-admin-layout-module"],{

/***/ "./node_modules/chartist/dist/chartist.js":
/*!************************************************!*\
  !*** ./node_modules/chartist/dist/chartist.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return (root['Chartist'] = factory());
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function () {

/* Chartist.js 0.11.1
 * Copyright © 2019 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */
/**
 * The core module of Chartist that is mainly providing static functions and higher level functions for chart modules.
 *
 * @module Chartist.Core
 */
var Chartist = {
  version: '0.11.1'
};

(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * This object contains all namespaces used within Chartist.
   *
   * @memberof Chartist.Core
   * @type {{svg: string, xmlns: string, xhtml: string, xlink: string, ct: string}}
   */
  Chartist.namespaces = {
    svg: 'http://www.w3.org/2000/svg',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    ct: 'http://gionkunz.github.com/chartist-js/ct'
  };

  /**
   * Helps to simplify functional style code
   *
   * @memberof Chartist.Core
   * @param {*} n This exact value will be returned by the noop function
   * @return {*} The same value that was provided to the n parameter
   */
  Chartist.noop = function (n) {
    return n;
  };

  /**
   * Generates a-z from a number 0 to 26
   *
   * @memberof Chartist.Core
   * @param {Number} n A number from 0 to 26 that will result in a letter a-z
   * @return {String} A character from a-z based on the input number n
   */
  Chartist.alphaNumerate = function (n) {
    // Limit to a-z
    return String.fromCharCode(97 + n % 26);
  };

  /**
   * Simple recursive object extend
   *
   * @memberof Chartist.Core
   * @param {Object} target Target object where the source will be merged into
   * @param {Object...} sources This object (objects) will be merged into target and then target is returned
   * @return {Object} An object that has the same reference as target but is extended and merged with the properties of source
   */
  Chartist.extend = function (target) {
    var i, source, sourceProp;
    target = target || {};

    for (i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (var prop in source) {
        sourceProp = source[prop];
        if (typeof sourceProp === 'object' && sourceProp !== null && !(sourceProp instanceof Array)) {
          target[prop] = Chartist.extend(target[prop], sourceProp);
        } else {
          target[prop] = sourceProp;
        }
      }
    }

    return target;
  };

  /**
   * Replaces all occurrences of subStr in str with newSubStr and returns a new string.
   *
   * @memberof Chartist.Core
   * @param {String} str
   * @param {String} subStr
   * @param {String} newSubStr
   * @return {String}
   */
  Chartist.replaceAll = function(str, subStr, newSubStr) {
    return str.replace(new RegExp(subStr, 'g'), newSubStr);
  };

  /**
   * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.
   *
   * @memberof Chartist.Core
   * @param {Number} value
   * @param {String} unit
   * @return {String} Returns the passed number value with unit.
   */
  Chartist.ensureUnit = function(value, unit) {
    if(typeof value === 'number') {
      value = value + unit;
    }

    return value;
  };

  /**
   * Converts a number or string to a quantity object.
   *
   * @memberof Chartist.Core
   * @param {String|Number} input
   * @return {Object} Returns an object containing the value as number and the unit as string.
   */
  Chartist.quantity = function(input) {
    if (typeof input === 'string') {
      var match = (/^(\d+)\s*(.*)$/g).exec(input);
      return {
        value : +match[1],
        unit: match[2] || undefined
      };
    }
    return { value: input };
  };

  /**
   * This is a wrapper around document.querySelector that will return the query if it's already of type Node
   *
   * @memberof Chartist.Core
   * @param {String|Node} query The query to use for selecting a Node or a DOM node that will be returned directly
   * @return {Node}
   */
  Chartist.querySelector = function(query) {
    return query instanceof Node ? query : document.querySelector(query);
  };

  /**
   * Functional style helper to produce array with given length initialized with undefined values
   *
   * @memberof Chartist.Core
   * @param length
   * @return {Array}
   */
  Chartist.times = function(length) {
    return Array.apply(null, new Array(length));
  };

  /**
   * Sum helper to be used in reduce functions
   *
   * @memberof Chartist.Core
   * @param previous
   * @param current
   * @return {*}
   */
  Chartist.sum = function(previous, current) {
    return previous + (current ? current : 0);
  };

  /**
   * Multiply helper to be used in `Array.map` for multiplying each value of an array with a factor.
   *
   * @memberof Chartist.Core
   * @param {Number} factor
   * @returns {Function} Function that can be used in `Array.map` to multiply each value in an array
   */
  Chartist.mapMultiply = function(factor) {
    return function(num) {
      return num * factor;
    };
  };

  /**
   * Add helper to be used in `Array.map` for adding a addend to each value of an array.
   *
   * @memberof Chartist.Core
   * @param {Number} addend
   * @returns {Function} Function that can be used in `Array.map` to add a addend to each value in an array
   */
  Chartist.mapAdd = function(addend) {
    return function(num) {
      return num + addend;
    };
  };

  /**
   * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
   *
   * @memberof Chartist.Core
   * @param arr
   * @param cb
   * @return {Array}
   */
  Chartist.serialMap = function(arr, cb) {
    var result = [],
        length = Math.max.apply(null, arr.map(function(e) {
          return e.length;
        }));

    Chartist.times(length).forEach(function(e, index) {
      var args = arr.map(function(e) {
        return e[index];
      });

      result[index] = cb.apply(null, args);
    });

    return result;
  };

  /**
   * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
   *
   * @memberof Chartist.Core
   * @param {Number} value The value that should be rounded with precision
   * @param {Number} [digits] The number of digits after decimal used to do the rounding
   * @returns {number} Rounded value
   */
  Chartist.roundWithPrecision = function(value, digits) {
    var precision = Math.pow(10, digits || Chartist.precision);
    return Math.round(value * precision) / precision;
  };

  /**
   * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
   *
   * @memberof Chartist.Core
   * @type {number}
   */
  Chartist.precision = 8;

  /**
   * A map with characters to escape for strings to be safely used as attribute values.
   *
   * @memberof Chartist.Core
   * @type {Object}
   */
  Chartist.escapingMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  /**
   * This function serializes arbitrary data to a string. In case of data that can't be easily converted to a string, this function will create a wrapper object and serialize the data using JSON.stringify. The outcoming string will always be escaped using Chartist.escapingMap.
   * If called with null or undefined the function will return immediately with null or undefined.
   *
   * @memberof Chartist.Core
   * @param {Number|String|Object} data
   * @return {String}
   */
  Chartist.serialize = function(data) {
    if(data === null || data === undefined) {
      return data;
    } else if(typeof data === 'number') {
      data = ''+data;
    } else if(typeof data === 'object') {
      data = JSON.stringify({data: data});
    }

    return Object.keys(Chartist.escapingMap).reduce(function(result, key) {
      return Chartist.replaceAll(result, key, Chartist.escapingMap[key]);
    }, data);
  };

  /**
   * This function de-serializes a string previously serialized with Chartist.serialize. The string will always be unescaped using Chartist.escapingMap before it's returned. Based on the input value the return type can be Number, String or Object. JSON.parse is used with try / catch to see if the unescaped string can be parsed into an Object and this Object will be returned on success.
   *
   * @memberof Chartist.Core
   * @param {String} data
   * @return {String|Number|Object}
   */
  Chartist.deserialize = function(data) {
    if(typeof data !== 'string') {
      return data;
    }

    data = Object.keys(Chartist.escapingMap).reduce(function(result, key) {
      return Chartist.replaceAll(result, Chartist.escapingMap[key], key);
    }, data);

    try {
      data = JSON.parse(data);
      data = data.data !== undefined ? data.data : data;
    } catch(e) {}

    return data;
  };

  /**
   * Create or reinitialize the SVG element for the chart
   *
   * @memberof Chartist.Core
   * @param {Node} container The containing DOM Node object that will be used to plant the SVG element
   * @param {String} width Set the width of the SVG element. Default is 100%
   * @param {String} height Set the height of the SVG element. Default is 100%
   * @param {String} className Specify a class to be added to the SVG element
   * @return {Object} The created/reinitialized SVG element
   */
  Chartist.createSvg = function (container, width, height, className) {
    var svg;

    width = width || '100%';
    height = height || '100%';

    // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
    // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/
    Array.prototype.slice.call(container.querySelectorAll('svg')).filter(function filterChartistSvgObjects(svg) {
      return svg.getAttributeNS(Chartist.namespaces.xmlns, 'ct');
    }).forEach(function removePreviousElement(svg) {
      container.removeChild(svg);
    });

    // Create svg object with width and height or use 100% as default
    svg = new Chartist.Svg('svg').attr({
      width: width,
      height: height
    }).addClass(className);

    svg._node.style.width = width;
    svg._node.style.height = height;

    // Add the DOM node to our container
    container.appendChild(svg._node);

    return svg;
  };

  /**
   * Ensures that the data object passed as second argument to the charts is present and correctly initialized.
   *
   * @param  {Object} data The data object that is passed as second argument to the charts
   * @return {Object} The normalized data object
   */
  Chartist.normalizeData = function(data, reverse, multi) {
    var labelCount;
    var output = {
      raw: data,
      normalized: {}
    };

    // Check if we should generate some labels based on existing series data
    output.normalized.series = Chartist.getDataArray({
      series: data.series || []
    }, reverse, multi);

    // If all elements of the normalized data array are arrays we're dealing with
    // multi series data and we need to find the largest series if they are un-even
    if (output.normalized.series.every(function(value) {
        return value instanceof Array;
      })) {
      // Getting the series with the the most elements
      labelCount = Math.max.apply(null, output.normalized.series.map(function(series) {
        return series.length;
      }));
    } else {
      // We're dealing with Pie data so we just take the normalized array length
      labelCount = output.normalized.series.length;
    }

    output.normalized.labels = (data.labels || []).slice();
    // Padding the labels to labelCount with empty strings
    Array.prototype.push.apply(
      output.normalized.labels,
      Chartist.times(Math.max(0, labelCount - output.normalized.labels.length)).map(function() {
        return '';
      })
    );

    if(reverse) {
      Chartist.reverseData(output.normalized);
    }

    return output;
  };

  /**
   * This function safely checks if an objects has an owned property.
   *
   * @param {Object} object The object where to check for a property
   * @param {string} property The property name
   * @returns {boolean} Returns true if the object owns the specified property
   */
  Chartist.safeHasProperty = function(object, property) {
    return object !== null &&
      typeof object === 'object' &&
      object.hasOwnProperty(property);
  };

  /**
   * Checks if a value is considered a hole in the data series.
   *
   * @param {*} value
   * @returns {boolean} True if the value is considered a data hole
   */
  Chartist.isDataHoleValue = function(value) {
    return value === null ||
      value === undefined ||
      (typeof value === 'number' && isNaN(value));
  };

  /**
   * Reverses the series, labels and series data arrays.
   *
   * @memberof Chartist.Core
   * @param data
   */
  Chartist.reverseData = function(data) {
    data.labels.reverse();
    data.series.reverse();
    for (var i = 0; i < data.series.length; i++) {
      if(typeof(data.series[i]) === 'object' && data.series[i].data !== undefined) {
        data.series[i].data.reverse();
      } else if(data.series[i] instanceof Array) {
        data.series[i].reverse();
      }
    }
  };

  /**
   * Convert data series into plain array
   *
   * @memberof Chartist.Core
   * @param {Object} data The series object that contains the data to be visualized in the chart
   * @param {Boolean} [reverse] If true the whole data is reversed by the getDataArray call. This will modify the data object passed as first parameter. The labels as well as the series order is reversed. The whole series data arrays are reversed too.
   * @param {Boolean} [multi] Create a multi dimensional array from a series data array where a value object with `x` and `y` values will be created.
   * @return {Array} A plain array that contains the data to be visualized in the chart
   */
  Chartist.getDataArray = function(data, reverse, multi) {
    // Recursively walks through nested arrays and convert string values to numbers and objects with value properties
    // to values. Check the tests in data core -> data normalization for a detailed specification of expected values
    function recursiveConvert(value) {
      if(Chartist.safeHasProperty(value, 'value')) {
        // We are dealing with value object notation so we need to recurse on value property
        return recursiveConvert(value.value);
      } else if(Chartist.safeHasProperty(value, 'data')) {
        // We are dealing with series object notation so we need to recurse on data property
        return recursiveConvert(value.data);
      } else if(value instanceof Array) {
        // Data is of type array so we need to recurse on the series
        return value.map(recursiveConvert);
      } else if(Chartist.isDataHoleValue(value)) {
        // We're dealing with a hole in the data and therefore need to return undefined
        // We're also returning undefined for multi value output
        return undefined;
      } else {
        // We need to prepare multi value output (x and y data)
        if(multi) {
          var multiValue = {};

          // Single series value arrays are assumed to specify the Y-Axis value
          // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]
          // If multi is a string then it's assumed that it specified which dimension should be filled as default
          if(typeof multi === 'string') {
            multiValue[multi] = Chartist.getNumberOrUndefined(value);
          } else {
            multiValue.y = Chartist.getNumberOrUndefined(value);
          }

          multiValue.x = value.hasOwnProperty('x') ? Chartist.getNumberOrUndefined(value.x) : multiValue.x;
          multiValue.y = value.hasOwnProperty('y') ? Chartist.getNumberOrUndefined(value.y) : multiValue.y;

          return multiValue;

        } else {
          // We can return simple data
          return Chartist.getNumberOrUndefined(value);
        }
      }
    }

    return data.series.map(recursiveConvert);
  };

  /**
   * Converts a number into a padding object.
   *
   * @memberof Chartist.Core
   * @param {Object|Number} padding
   * @param {Number} [fallback] This value is used to fill missing values if a incomplete padding object was passed
   * @returns {Object} Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
   */
  Chartist.normalizePadding = function(padding, fallback) {
    fallback = fallback || 0;

    return typeof padding === 'number' ? {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    } : {
      top: typeof padding.top === 'number' ? padding.top : fallback,
      right: typeof padding.right === 'number' ? padding.right : fallback,
      bottom: typeof padding.bottom === 'number' ? padding.bottom : fallback,
      left: typeof padding.left === 'number' ? padding.left : fallback
    };
  };

  Chartist.getMetaData = function(series, index) {
    var value = series.data ? series.data[index] : series[index];
    return value ? value.meta : undefined;
  };

  /**
   * Calculate the order of magnitude for the chart scale
   *
   * @memberof Chartist.Core
   * @param {Number} value The value Range of the chart
   * @return {Number} The order of magnitude
   */
  Chartist.orderOfMagnitude = function (value) {
    return Math.floor(Math.log(Math.abs(value)) / Math.LN10);
  };

  /**
   * Project a data length into screen coordinates (pixels)
   *
   * @memberof Chartist.Core
   * @param {Object} axisLength The svg element for the chart
   * @param {Number} length Single data value from a series array
   * @param {Object} bounds All the values to set the bounds of the chart
   * @return {Number} The projected data length in pixels
   */
  Chartist.projectLength = function (axisLength, length, bounds) {
    return length / bounds.range * axisLength;
  };

  /**
   * Get the height of the area in the chart for the data series
   *
   * @memberof Chartist.Core
   * @param {Object} svg The svg element for the chart
   * @param {Object} options The Object that contains all the optional values for the chart
   * @return {Number} The height of the area in the chart for the data series
   */
  Chartist.getAvailableHeight = function (svg, options) {
    return Math.max((Chartist.quantity(options.height).value || svg.height()) - (options.chartPadding.top +  options.chartPadding.bottom) - options.axisX.offset, 0);
  };

  /**
   * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.
   *
   * @memberof Chartist.Core
   * @param {Array} data The array that contains the data to be visualized in the chart
   * @param {Object} options The Object that contains the chart options
   * @param {String} dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
   * @return {Object} An object that contains the highest and lowest value that will be visualized on the chart.
   */
  Chartist.getHighLow = function (data, options, dimension) {
    // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred
    options = Chartist.extend({}, options, dimension ? options['axis' + dimension.toUpperCase()] : {});

    var highLow = {
        high: options.high === undefined ? -Number.MAX_VALUE : +options.high,
        low: options.low === undefined ? Number.MAX_VALUE : +options.low
      };
    var findHigh = options.high === undefined;
    var findLow = options.low === undefined;

    // Function to recursively walk through arrays and find highest and lowest number
    function recursiveHighLow(data) {
      if(data === undefined) {
        return undefined;
      } else if(data instanceof Array) {
        for (var i = 0; i < data.length; i++) {
          recursiveHighLow(data[i]);
        }
      } else {
        var value = dimension ? +data[dimension] : +data;

        if (findHigh && value > highLow.high) {
          highLow.high = value;
        }

        if (findLow && value < highLow.low) {
          highLow.low = value;
        }
      }
    }

    // Start to find highest and lowest number recursively
    if(findHigh || findLow) {
      recursiveHighLow(data);
    }

    // Overrides of high / low based on reference value, it will make sure that the invisible reference value is
    // used to generate the chart. This is useful when the chart always needs to contain the position of the
    // invisible reference value in the view i.e. for bipolar scales.
    if (options.referenceValue || options.referenceValue === 0) {
      highLow.high = Math.max(options.referenceValue, highLow.high);
      highLow.low = Math.min(options.referenceValue, highLow.low);
    }

    // If high and low are the same because of misconfiguration or flat data (only the same value) we need
    // to set the high or low to 0 depending on the polarity
    if (highLow.high <= highLow.low) {
      // If both values are 0 we set high to 1
      if (highLow.low === 0) {
        highLow.high = 1;
      } else if (highLow.low < 0) {
        // If we have the same negative value for the bounds we set bounds.high to 0
        highLow.high = 0;
      } else if (highLow.high > 0) {
        // If we have the same positive value for the bounds we set bounds.low to 0
        highLow.low = 0;
      } else {
        // If data array was empty, values are Number.MAX_VALUE and -Number.MAX_VALUE. Set bounds to prevent errors
        highLow.high = 1;
        highLow.low = 0;
      }
    }

    return highLow;
  };

  /**
   * Checks if a value can be safely coerced to a number. This includes all values except null which result in finite numbers when coerced. This excludes NaN, since it's not finite.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {Boolean}
   */
  Chartist.isNumeric = function(value) {
    return value === null ? false : isFinite(value);
  };

  /**
   * Returns true on all falsey values except the numeric value 0.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {boolean}
   */
  Chartist.isFalseyButZero = function(value) {
    return !value && value !== 0;
  };

  /**
   * Returns a number if the passed parameter is a valid number or the function will return undefined. On all other values than a valid number, this function will return undefined.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {*}
   */
  Chartist.getNumberOrUndefined = function(value) {
    return Chartist.isNumeric(value) ? +value : undefined;
  };

  /**
   * Checks if provided value object is multi value (contains x or y properties)
   *
   * @memberof Chartist.Core
   * @param value
   */
  Chartist.isMultiValue = function(value) {
    return typeof value === 'object' && ('x' in value || 'y' in value);
  };

  /**
   * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return `defaultValue`.
   *
   * @memberof Chartist.Core
   * @param value
   * @param dimension
   * @param defaultValue
   * @returns {*}
   */
  Chartist.getMultiValue = function(value, dimension) {
    if(Chartist.isMultiValue(value)) {
      return Chartist.getNumberOrUndefined(value[dimension || 'y']);
    } else {
      return Chartist.getNumberOrUndefined(value);
    }
  };

  /**
   * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
   *
   * @memberof Chartist.Core
   * @param {Number} num An integer number where the smallest factor should be searched for
   * @returns {Number} The smallest integer factor of the parameter num.
   */
  Chartist.rho = function(num) {
    if(num === 1) {
      return num;
    }

    function gcd(p, q) {
      if (p % q === 0) {
        return q;
      } else {
        return gcd(q, p % q);
      }
    }

    function f(x) {
      return x * x + 1;
    }

    var x1 = 2, x2 = 2, divisor;
    if (num % 2 === 0) {
      return 2;
    }

    do {
      x1 = f(x1) % num;
      x2 = f(f(x2)) % num;
      divisor = gcd(Math.abs(x1 - x2), num);
    } while (divisor === 1);

    return divisor;
  };

  /**
   * Calculate and retrieve all the bounds for the chart and return them in one array
   *
   * @memberof Chartist.Core
   * @param {Number} axisLength The length of the Axis used for
   * @param {Object} highLow An object containing a high and low property indicating the value range of the chart.
   * @param {Number} scaleMinSpace The minimum projected length a step should result in
   * @param {Boolean} onlyInteger
   * @return {Object} All the values to set the bounds of the chart
   */
  Chartist.getBounds = function (axisLength, highLow, scaleMinSpace, onlyInteger) {
    var i,
      optimizationCounter = 0,
      newMin,
      newMax,
      bounds = {
        high: highLow.high,
        low: highLow.low
      };

    bounds.valueRange = bounds.high - bounds.low;
    bounds.oom = Chartist.orderOfMagnitude(bounds.valueRange);
    bounds.step = Math.pow(10, bounds.oom);
    bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;
    bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;
    bounds.range = bounds.max - bounds.min;
    bounds.numberOfSteps = Math.round(bounds.range / bounds.step);

    // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace
    // If we are already below the scaleMinSpace value we will scale up
    var length = Chartist.projectLength(axisLength, bounds.step, bounds);
    var scaleUp = length < scaleMinSpace;
    var smallestFactor = onlyInteger ? Chartist.rho(bounds.range) : 0;

    // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1
    if(onlyInteger && Chartist.projectLength(axisLength, 1, bounds) >= scaleMinSpace) {
      bounds.step = 1;
    } else if(onlyInteger && smallestFactor < bounds.step && Chartist.projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
      // If step 1 was too small, we can try the smallest factor of range
      // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor
      // is larger than the scaleMinSpace we should go for it.
      bounds.step = smallestFactor;
    } else {
      // Trying to divide or multiply by 2 and find the best step value
      while (true) {
        if (scaleUp && Chartist.projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {
          bounds.step *= 2;
        } else if (!scaleUp && Chartist.projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {
          bounds.step /= 2;
          if(onlyInteger && bounds.step % 1 !== 0) {
            bounds.step *= 2;
            break;
          }
        } else {
          break;
        }

        if(optimizationCounter++ > 1000) {
          throw new Error('Exceeded maximum number of iterations while optimizing scale step!');
        }
      }
    }

    var EPSILON = 2.221E-16;
    bounds.step = Math.max(bounds.step, EPSILON);
    function safeIncrement(value, increment) {
      // If increment is too small use *= (1+EPSILON) as a simple nextafter
      if (value === (value += increment)) {
      	value *= (1 + (increment > 0 ? EPSILON : -EPSILON));
      }
      return value;
    }

    // Narrow min and max based on new step
    newMin = bounds.min;
    newMax = bounds.max;
    while (newMin + bounds.step <= bounds.low) {
    	newMin = safeIncrement(newMin, bounds.step);
    }
    while (newMax - bounds.step >= bounds.high) {
    	newMax = safeIncrement(newMax, -bounds.step);
    }
    bounds.min = newMin;
    bounds.max = newMax;
    bounds.range = bounds.max - bounds.min;

    var values = [];
    for (i = bounds.min; i <= bounds.max; i = safeIncrement(i, bounds.step)) {
      var value = Chartist.roundWithPrecision(i);
      if (value !== values[values.length - 1]) {
        values.push(value);
      }
    }
    bounds.values = values;
    return bounds;
  };

  /**
   * Calculate cartesian coordinates of polar coordinates
   *
   * @memberof Chartist.Core
   * @param {Number} centerX X-axis coordinates of center point of circle segment
   * @param {Number} centerY X-axis coordinates of center point of circle segment
   * @param {Number} radius Radius of circle segment
   * @param {Number} angleInDegrees Angle of circle segment in degrees
   * @return {{x:Number, y:Number}} Coordinates of point on circumference
   */
  Chartist.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  /**
   * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right
   *
   * @memberof Chartist.Core
   * @param {Object} svg The svg element for the chart
   * @param {Object} options The Object that contains all the optional values for the chart
   * @param {Number} [fallbackPadding] The fallback padding if partial padding objects are used
   * @return {Object} The chart rectangles coordinates inside the svg element plus the rectangles measurements
   */
  Chartist.createChartRect = function (svg, options, fallbackPadding) {
    var hasAxis = !!(options.axisX || options.axisY);
    var yAxisOffset = hasAxis ? options.axisY.offset : 0;
    var xAxisOffset = hasAxis ? options.axisX.offset : 0;
    // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0
    var width = svg.width() || Chartist.quantity(options.width).value || 0;
    var height = svg.height() || Chartist.quantity(options.height).value || 0;
    var normalizedPadding = Chartist.normalizePadding(options.chartPadding, fallbackPadding);

    // If settings were to small to cope with offset (legacy) and padding, we'll adjust
    width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);
    height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);

    var chartRect = {
      padding: normalizedPadding,
      width: function () {
        return this.x2 - this.x1;
      },
      height: function () {
        return this.y1 - this.y2;
      }
    };

    if(hasAxis) {
      if (options.axisX.position === 'start') {
        chartRect.y2 = normalizedPadding.top + xAxisOffset;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
      } else {
        chartRect.y2 = normalizedPadding.top;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);
      }

      if (options.axisY.position === 'start') {
        chartRect.x1 = normalizedPadding.left + yAxisOffset;
        chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
      } else {
        chartRect.x1 = normalizedPadding.left;
        chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);
      }
    } else {
      chartRect.x1 = normalizedPadding.left;
      chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
      chartRect.y2 = normalizedPadding.top;
      chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
    }

    return chartRect;
  };

  /**
   * Creates a grid line based on a projected value.
   *
   * @memberof Chartist.Core
   * @param position
   * @param index
   * @param axis
   * @param offset
   * @param length
   * @param group
   * @param classes
   * @param eventEmitter
   */
  Chartist.createGrid = function(position, index, axis, offset, length, group, classes, eventEmitter) {
    var positionalData = {};
    positionalData[axis.units.pos + '1'] = position;
    positionalData[axis.units.pos + '2'] = position;
    positionalData[axis.counterUnits.pos + '1'] = offset;
    positionalData[axis.counterUnits.pos + '2'] = offset + length;

    var gridElement = group.elem('line', positionalData, classes.join(' '));

    // Event for grid draw
    eventEmitter.emit('draw',
      Chartist.extend({
        type: 'grid',
        axis: axis,
        index: index,
        group: group,
        element: gridElement
      }, positionalData)
    );
  };

  /**
   * Creates a grid background rect and emits the draw event.
   *
   * @memberof Chartist.Core
   * @param gridGroup
   * @param chartRect
   * @param className
   * @param eventEmitter
   */
  Chartist.createGridBackground = function (gridGroup, chartRect, className, eventEmitter) {
    var gridBackground = gridGroup.elem('rect', {
        x: chartRect.x1,
        y: chartRect.y2,
        width: chartRect.width(),
        height: chartRect.height(),
      }, className, true);

      // Event for grid background draw
      eventEmitter.emit('draw', {
        type: 'gridBackground',
        group: gridGroup,
        element: gridBackground
      });
  };

  /**
   * Creates a label based on a projected value and an axis.
   *
   * @memberof Chartist.Core
   * @param position
   * @param length
   * @param index
   * @param labels
   * @param axis
   * @param axisOffset
   * @param labelOffset
   * @param group
   * @param classes
   * @param useForeignObject
   * @param eventEmitter
   */
  Chartist.createLabel = function(position, length, index, labels, axis, axisOffset, labelOffset, group, classes, useForeignObject, eventEmitter) {
    var labelElement;
    var positionalData = {};

    positionalData[axis.units.pos] = position + labelOffset[axis.units.pos];
    positionalData[axis.counterUnits.pos] = labelOffset[axis.counterUnits.pos];
    positionalData[axis.units.len] = length;
    positionalData[axis.counterUnits.len] = Math.max(0, axisOffset - 10);

    if(useForeignObject) {
      // We need to set width and height explicitly to px as span will not expand with width and height being
      // 100% in all browsers
      var content = document.createElement('span');
      content.className = classes.join(' ');
      content.setAttribute('xmlns', Chartist.namespaces.xhtml);
      content.innerText = labels[index];
      content.style[axis.units.len] = Math.round(positionalData[axis.units.len]) + 'px';
      content.style[axis.counterUnits.len] = Math.round(positionalData[axis.counterUnits.len]) + 'px';

      labelElement = group.foreignObject(content, Chartist.extend({
        style: 'overflow: visible;'
      }, positionalData));
    } else {
      labelElement = group.elem('text', positionalData, classes.join(' ')).text(labels[index]);
    }

    eventEmitter.emit('draw', Chartist.extend({
      type: 'label',
      axis: axis,
      index: index,
      group: group,
      element: labelElement,
      text: labels[index]
    }, positionalData));
  };

  /**
   * Helper to read series specific options from options object. It automatically falls back to the global option if
   * there is no option in the series options.
   *
   * @param {Object} series Series object
   * @param {Object} options Chartist options object
   * @param {string} key The options key that should be used to obtain the options
   * @returns {*}
   */
  Chartist.getSeriesOption = function(series, options, key) {
    if(series.name && options.series && options.series[series.name]) {
      var seriesOptions = options.series[series.name];
      return seriesOptions.hasOwnProperty(key) ? seriesOptions[key] : options[key];
    } else {
      return options[key];
    }
  };

  /**
   * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
   *
   * @memberof Chartist.Core
   * @param {Object} options Options set by user
   * @param {Array} responsiveOptions Optional functions to add responsive behavior to chart
   * @param {Object} eventEmitter The event emitter that will be used to emit the options changed events
   * @return {Object} The consolidated options object from the defaults, base and matching responsive options
   */
  Chartist.optionsProvider = function (options, responsiveOptions, eventEmitter) {
    var baseOptions = Chartist.extend({}, options),
      currentOptions,
      mediaQueryListeners = [],
      i;

    function updateCurrentOptions(mediaEvent) {
      var previousOptions = currentOptions;
      currentOptions = Chartist.extend({}, baseOptions);

      if (responsiveOptions) {
        for (i = 0; i < responsiveOptions.length; i++) {
          var mql = window.matchMedia(responsiveOptions[i][0]);
          if (mql.matches) {
            currentOptions = Chartist.extend(currentOptions, responsiveOptions[i][1]);
          }
        }
      }

      if(eventEmitter && mediaEvent) {
        eventEmitter.emit('optionsChanged', {
          previousOptions: previousOptions,
          currentOptions: currentOptions
        });
      }
    }

    function removeMediaQueryListeners() {
      mediaQueryListeners.forEach(function(mql) {
        mql.removeListener(updateCurrentOptions);
      });
    }

    if (!window.matchMedia) {
      throw 'window.matchMedia not found! Make sure you\'re using a polyfill.';
    } else if (responsiveOptions) {

      for (i = 0; i < responsiveOptions.length; i++) {
        var mql = window.matchMedia(responsiveOptions[i][0]);
        mql.addListener(updateCurrentOptions);
        mediaQueryListeners.push(mql);
      }
    }
    // Execute initially without an event argument so we get the correct options
    updateCurrentOptions();

    return {
      removeMediaQueryListeners: removeMediaQueryListeners,
      getCurrentOptions: function getCurrentOptions() {
        return Chartist.extend({}, currentOptions);
      }
    };
  };


  /**
   * Splits a list of coordinates and associated values into segments. Each returned segment contains a pathCoordinates
   * valueData property describing the segment.
   *
   * With the default options, segments consist of contiguous sets of points that do not have an undefined value. Any
   * points with undefined values are discarded.
   *
   * **Options**
   * The following options are used to determine how segments are formed
   * ```javascript
   * var options = {
   *   // If fillHoles is true, undefined values are simply discarded without creating a new segment. Assuming other options are default, this returns single segment.
   *   fillHoles: false,
   *   // If increasingX is true, the coordinates in all segments have strictly increasing x-values.
   *   increasingX: false
   * };
   * ```
   *
   * @memberof Chartist.Core
   * @param {Array} pathCoordinates List of point coordinates to be split in the form [x1, y1, x2, y2 ... xn, yn]
   * @param {Array} values List of associated point values in the form [v1, v2 .. vn]
   * @param {Object} options Options set by user
   * @return {Array} List of segments, each containing a pathCoordinates and valueData property.
   */
  Chartist.splitIntoSegments = function(pathCoordinates, valueData, options) {
    var defaultOptions = {
      increasingX: false,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    var segments = [];
    var hole = true;

    for(var i = 0; i < pathCoordinates.length; i += 2) {
      // If this value is a "hole" we set the hole flag
      if(Chartist.getMultiValue(valueData[i / 2].value) === undefined) {
      // if(valueData[i / 2].value === undefined) {
        if(!options.fillHoles) {
          hole = true;
        }
      } else {
        if(options.increasingX && i >= 2 && pathCoordinates[i] <= pathCoordinates[i-2]) {
          // X is not increasing, so we need to make sure we start a new segment
          hole = true;
        }


        // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment
        if(hole) {
          segments.push({
            pathCoordinates: [],
            valueData: []
          });
          // As we have a valid value now, we are not in a "hole" anymore
          hole = false;
        }

        // Add to the segment pathCoordinates and valueData
        segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);
        segments[segments.length - 1].valueData.push(valueData[i / 2]);
      }
    }

    return segments;
  };
}(this, Chartist));
;/**
 * Chartist path interpolation functions.
 *
 * @module Chartist.Interpolation
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  Chartist.Interpolation = {};

  /**
   * This interpolation function does not smooth the path and the result is only containing lines and no curves.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.none({
   *     fillHoles: false
   *   })
   * });
   *
   *
   * @memberof Chartist.Interpolation
   * @return {Function}
   */
  Chartist.Interpolation.none = function(options) {
    var defaultOptions = {
      fillHoles: false
    };
    options = Chartist.extend({}, defaultOptions, options);
    return function none(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();
      var hole = true;

      for(var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var currData = valueData[i / 2];

        if(Chartist.getMultiValue(currData.value) !== undefined) {

          if(hole) {
            path.move(currX, currY, false, currData);
          } else {
            path.line(currX, currY, false, currData);
          }

          hole = false;
        } else if(!options.fillHoles) {
          hole = true;
        }
      }

      return path;
    };
  };

  /**
   * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
   *
   * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.simple({
   *     divisor: 2,
   *     fillHoles: false
   *   })
   * });
   *
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the simple interpolation factory function.
   * @return {Function}
   */
  Chartist.Interpolation.simple = function(options) {
    var defaultOptions = {
      divisor: 2,
      fillHoles: false
    };
    options = Chartist.extend({}, defaultOptions, options);

    var d = 1 / Math.max(1, options.divisor);

    return function simple(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();
      var prevX, prevY, prevData;

      for(var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var length = (currX - prevX) * d;
        var currData = valueData[i / 2];

        if(currData.value !== undefined) {

          if(prevData === undefined) {
            path.move(currX, currY, false, currData);
          } else {
            path.curve(
              prevX + length,
              prevY,
              currX - length,
              currY,
              currX,
              currY,
              false,
              currData
            );
          }

          prevX = currX;
          prevY = currY;
          prevData = currData;
        } else if(!options.fillHoles) {
          prevX = currX = prevData = undefined;
        }
      }

      return path;
    };
  };

  /**
   * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
   *
   * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.cardinal({
   *     tension: 1,
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the cardinal factory function.
   * @return {Function}
   */
  Chartist.Interpolation.cardinal = function(options) {
    var defaultOptions = {
      tension: 1,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    var t = Math.min(1, Math.max(0, options.tension)),
      c = 1 - t;

    return function cardinal(pathCoordinates, valueData) {
      // First we try to split the coordinates into segments
      // This is necessary to treat "holes" in line charts
      var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
        fillHoles: options.fillHoles
      });

      if(!segments.length) {
        // If there were no segments return 'Chartist.Interpolation.none'
        return Chartist.Interpolation.none()([]);
      } else if(segments.length > 1) {
        // If the split resulted in more that one segment we need to interpolate each segment individually and join them
        // afterwards together into a single path.
          var paths = [];
        // For each segment we will recurse the cardinal function
        segments.forEach(function(segment) {
          paths.push(cardinal(segment.pathCoordinates, segment.valueData));
        });
        // Join the segment path data into a single path and return
        return Chartist.Svg.Path.join(paths);
      } else {
        // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
        // segment
        pathCoordinates = segments[0].pathCoordinates;
        valueData = segments[0].valueData;

        // If less than two points we need to fallback to no smoothing
        if(pathCoordinates.length <= 4) {
          return Chartist.Interpolation.none()(pathCoordinates, valueData);
        }

        var path = new Chartist.Svg.Path().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]),
          z;

        for (var i = 0, iLen = pathCoordinates.length; iLen - 2 * !z > i; i += 2) {
          var p = [
            {x: +pathCoordinates[i - 2], y: +pathCoordinates[i - 1]},
            {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]},
            {x: +pathCoordinates[i + 2], y: +pathCoordinates[i + 3]},
            {x: +pathCoordinates[i + 4], y: +pathCoordinates[i + 5]}
          ];
          if (z) {
            if (!i) {
              p[0] = {x: +pathCoordinates[iLen - 2], y: +pathCoordinates[iLen - 1]};
            } else if (iLen - 4 === i) {
              p[3] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};
            } else if (iLen - 2 === i) {
              p[2] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};
              p[3] = {x: +pathCoordinates[2], y: +pathCoordinates[3]};
            }
          } else {
            if (iLen - 4 === i) {
              p[3] = p[2];
            } else if (!i) {
              p[0] = {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]};
            }
          }

          path.curve(
            (t * (-p[0].x + 6 * p[1].x + p[2].x) / 6) + (c * p[2].x),
            (t * (-p[0].y + 6 * p[1].y + p[2].y) / 6) + (c * p[2].y),
            (t * (p[1].x + 6 * p[2].x - p[3].x) / 6) + (c * p[2].x),
            (t * (p[1].y + 6 * p[2].y - p[3].y) / 6) + (c * p[2].y),
            p[2].x,
            p[2].y,
            false,
            valueData[(i + 2) / 2]
          );
        }

        return path;
      }
    };
  };

  /**
   * Monotone Cubic spline interpolation produces a smooth curve which preserves monotonicity. Unlike cardinal splines, the curve will not extend beyond the range of y-values of the original data points.
   *
   * Monotone Cubic splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
   *
   * The x-values of subsequent points must be increasing to fit a Monotone Cubic spline. If this condition is not met for a pair of adjacent points, then there will be a break in the curve between those data points.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.monotoneCubic({
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the monotoneCubic factory function.
   * @return {Function}
   */
  Chartist.Interpolation.monotoneCubic = function(options) {
    var defaultOptions = {
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    return function monotoneCubic(pathCoordinates, valueData) {
      // First we try to split the coordinates into segments
      // This is necessary to treat "holes" in line charts
      var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
        fillHoles: options.fillHoles,
        increasingX: true
      });

      if(!segments.length) {
        // If there were no segments return 'Chartist.Interpolation.none'
        return Chartist.Interpolation.none()([]);
      } else if(segments.length > 1) {
        // If the split resulted in more that one segment we need to interpolate each segment individually and join them
        // afterwards together into a single path.
          var paths = [];
        // For each segment we will recurse the monotoneCubic fn function
        segments.forEach(function(segment) {
          paths.push(monotoneCubic(segment.pathCoordinates, segment.valueData));
        });
        // Join the segment path data into a single path and return
        return Chartist.Svg.Path.join(paths);
      } else {
        // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
        // segment
        pathCoordinates = segments[0].pathCoordinates;
        valueData = segments[0].valueData;

        // If less than three points we need to fallback to no smoothing
        if(pathCoordinates.length <= 4) {
          return Chartist.Interpolation.none()(pathCoordinates, valueData);
        }

        var xs = [],
          ys = [],
          i,
          n = pathCoordinates.length / 2,
          ms = [],
          ds = [], dys = [], dxs = [],
          path;

        // Populate x and y coordinates into separate arrays, for readability

        for(i = 0; i < n; i++) {
          xs[i] = pathCoordinates[i * 2];
          ys[i] = pathCoordinates[i * 2 + 1];
        }

        // Calculate deltas and derivative

        for(i = 0; i < n - 1; i++) {
          dys[i] = ys[i + 1] - ys[i];
          dxs[i] = xs[i + 1] - xs[i];
          ds[i] = dys[i] / dxs[i];
        }

        // Determine desired slope (m) at each point using Fritsch-Carlson method
        // See: http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation

        ms[0] = ds[0];
        ms[n - 1] = ds[n - 2];

        for(i = 1; i < n - 1; i++) {
          if(ds[i] === 0 || ds[i - 1] === 0 || (ds[i - 1] > 0) !== (ds[i] > 0)) {
            ms[i] = 0;
          } else {
            ms[i] = 3 * (dxs[i - 1] + dxs[i]) / (
              (2 * dxs[i] + dxs[i - 1]) / ds[i - 1] +
              (dxs[i] + 2 * dxs[i - 1]) / ds[i]);

            if(!isFinite(ms[i])) {
              ms[i] = 0;
            }
          }
        }

        // Now build a path from the slopes

        path = new Chartist.Svg.Path().move(xs[0], ys[0], false, valueData[0]);

        for(i = 0; i < n - 1; i++) {
          path.curve(
            // First control point
            xs[i] + dxs[i] / 3,
            ys[i] + ms[i] * dxs[i] / 3,
            // Second control point
            xs[i + 1] - dxs[i] / 3,
            ys[i + 1] - ms[i + 1] * dxs[i] / 3,
            // End point
            xs[i + 1],
            ys[i + 1],

            false,
            valueData[i + 1]
          );
        }

        return path;
      }
    };
  };

  /**
   * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.step({
   *     postpone: true,
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param options
   * @returns {Function}
   */
  Chartist.Interpolation.step = function(options) {
    var defaultOptions = {
      postpone: true,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    return function step(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();

      var prevX, prevY, prevData;

      for (var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var currData = valueData[i / 2];

        // If the current point is also not a hole we can draw the step lines
        if(currData.value !== undefined) {
          if(prevData === undefined) {
            path.move(currX, currY, false, currData);
          } else {
            if(options.postpone) {
              // If postponed we should draw the step line with the value of the previous value
              path.line(currX, prevY, false, prevData);
            } else {
              // If not postponed we should draw the step line with the value of the current value
              path.line(prevX, currY, false, currData);
            }
            // Line to the actual point (this should only be a Y-Axis movement
            path.line(currX, currY, false, currData);
          }

          prevX = currX;
          prevY = currY;
          prevData = currData;
        } else if(!options.fillHoles) {
          prevX = prevY = prevData = undefined;
        }
      }

      return path;
    };
  };

}(this, Chartist));
;/**
 * A very basic event module that helps to generate and catch events.
 *
 * @module Chartist.Event
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  Chartist.EventEmitter = function () {
    var handlers = [];

    /**
     * Add an event handler for a specific event
     *
     * @memberof Chartist.Event
     * @param {String} event The event name
     * @param {Function} handler A event handler function
     */
    function addEventHandler(event, handler) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    }

    /**
     * Remove an event handler of a specific event name or remove all event handlers for a specific event.
     *
     * @memberof Chartist.Event
     * @param {String} event The event name where a specific or all handlers should be removed
     * @param {Function} [handler] An optional event handler function. If specified only this specific handler will be removed and otherwise all handlers are removed.
     */
    function removeEventHandler(event, handler) {
      // Only do something if there are event handlers with this name existing
      if(handlers[event]) {
        // If handler is set we will look for a specific handler and only remove this
        if(handler) {
          handlers[event].splice(handlers[event].indexOf(handler), 1);
          if(handlers[event].length === 0) {
            delete handlers[event];
          }
        } else {
          // If no handler is specified we remove all handlers for this event
          delete handlers[event];
        }
      }
    }

    /**
     * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
     *
     * @memberof Chartist.Event
     * @param {String} event The event name that should be triggered
     * @param {*} data Arbitrary data that will be passed to the event handler callback functions
     */
    function emit(event, data) {
      // Only do something if there are event handlers with this name existing
      if(handlers[event]) {
        handlers[event].forEach(function(handler) {
          handler(data);
        });
      }

      // Emit event to star event handlers
      if(handlers['*']) {
        handlers['*'].forEach(function(starHandler) {
          starHandler(event, data);
        });
      }
    }

    return {
      addEventHandler: addEventHandler,
      removeEventHandler: removeEventHandler,
      emit: emit
    };
  };

}(this, Chartist));
;/**
 * This module provides some basic prototype inheritance utilities.
 *
 * @module Chartist.Class
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  function listToArray(list) {
    var arr = [];
    if (list.length) {
      for (var i = 0; i < list.length; i++) {
        arr.push(list[i]);
      }
    }
    return arr;
  }

  /**
   * Method to extend from current prototype.
   *
   * @memberof Chartist.Class
   * @param {Object} properties The object that serves as definition for the prototype that gets created for the new class. This object should always contain a constructor property that is the desired constructor for the newly created class.
   * @param {Object} [superProtoOverride] By default extens will use the current class prototype or Chartist.class. With this parameter you can specify any super prototype that will be used.
   * @return {Function} Constructor function of the new class
   *
   * @example
   * var Fruit = Class.extend({
     * color: undefined,
     *   sugar: undefined,
     *
     *   constructor: function(color, sugar) {
     *     this.color = color;
     *     this.sugar = sugar;
     *   },
     *
     *   eat: function() {
     *     this.sugar = 0;
     *     return this;
     *   }
     * });
   *
   * var Banana = Fruit.extend({
     *   length: undefined,
     *
     *   constructor: function(length, sugar) {
     *     Banana.super.constructor.call(this, 'Yellow', sugar);
     *     this.length = length;
     *   }
     * });
   *
   * var banana = new Banana(20, 40);
   * console.log('banana instanceof Fruit', banana instanceof Fruit);
   * console.log('Fruit is prototype of banana', Fruit.prototype.isPrototypeOf(banana));
   * console.log('bananas prototype is Fruit', Object.getPrototypeOf(banana) === Fruit.prototype);
   * console.log(banana.sugar);
   * console.log(banana.eat().sugar);
   * console.log(banana.color);
   */
  function extend(properties, superProtoOverride) {
    var superProto = superProtoOverride || this.prototype || Chartist.Class;
    var proto = Object.create(superProto);

    Chartist.Class.cloneDefinitions(proto, properties);

    var constr = function() {
      var fn = proto.constructor || function () {},
        instance;

      // If this is linked to the Chartist namespace the constructor was not called with new
      // To provide a fallback we will instantiate here and return the instance
      instance = this === Chartist ? Object.create(proto) : this;
      fn.apply(instance, Array.prototype.slice.call(arguments, 0));

      // If this constructor was not called with new we need to return the instance
      // This will not harm when the constructor has been called with new as the returned value is ignored
      return instance;
    };

    constr.prototype = proto;
    constr.super = superProto;
    constr.extend = this.extend;

    return constr;
  }

  // Variable argument list clones args > 0 into args[0] and retruns modified args[0]
  function cloneDefinitions() {
    var args = listToArray(arguments);
    var target = args[0];

    args.splice(1, args.length - 1).forEach(function (source) {
      Object.getOwnPropertyNames(source).forEach(function (propName) {
        // If this property already exist in target we delete it first
        delete target[propName];
        // Define the property with the descriptor from source
        Object.defineProperty(target, propName,
          Object.getOwnPropertyDescriptor(source, propName));
      });
    });

    return target;
  }

  Chartist.Class = {
    extend: extend,
    cloneDefinitions: cloneDefinitions
  };

}(this, Chartist));
;/**
 * Base for all chart types. The methods in Chartist.Base are inherited to all chart types.
 *
 * @module Chartist.Base
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;

  // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
  // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not
  // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.
  // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html
  // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj
  // The problem is with the label offsets that can't be converted into percentage and affecting the chart container
  /**
   * Updates the chart which currently does a full reconstruction of the SVG DOM
   *
   * @param {Object} [data] Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
   * @param {Object} [options] Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
   * @param {Boolean} [override] If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
   * @memberof Chartist.Base
   */
  function update(data, options, override) {
    if(data) {
      this.data = data || {};
      this.data.labels = this.data.labels || [];
      this.data.series = this.data.series || [];
      // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
      this.eventEmitter.emit('data', {
        type: 'update',
        data: this.data
      });
    }

    if(options) {
      this.options = Chartist.extend({}, override ? this.options : this.defaultOptions, options);

      // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
      // Otherwise we re-create the optionsProvider at this point
      if(!this.initializeTimeoutId) {
        this.optionsProvider.removeMediaQueryListeners();
        this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
      }
    }

    // Only re-created the chart if it has been initialized yet
    if(!this.initializeTimeoutId) {
      this.createChart(this.optionsProvider.getCurrentOptions());
    }

    // Return a reference to the chart object to chain up calls
    return this;
  }

  /**
   * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
   *
   * @memberof Chartist.Base
   */
  function detach() {
    // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
    // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout
    if(!this.initializeTimeoutId) {
      window.removeEventListener('resize', this.resizeListener);
      this.optionsProvider.removeMediaQueryListeners();
    } else {
      window.clearTimeout(this.initializeTimeoutId);
    }

    return this;
  }

  /**
   * Use this function to register event handlers. The handler callbacks are synchronous and will run in the main thread rather than the event loop.
   *
   * @memberof Chartist.Base
   * @param {String} event Name of the event. Check the examples for supported events.
   * @param {Function} handler The handler function that will be called when an event with the given name was emitted. This function will receive a data argument which contains event data. See the example for more details.
   */
  function on(event, handler) {
    this.eventEmitter.addEventHandler(event, handler);
    return this;
  }

  /**
   * Use this function to un-register event handlers. If the handler function parameter is omitted all handlers for the given event will be un-registered.
   *
   * @memberof Chartist.Base
   * @param {String} event Name of the event for which a handler should be removed
   * @param {Function} [handler] The handler function that that was previously used to register a new event handler. This handler will be removed from the event handler list. If this parameter is omitted then all event handlers for the given event are removed from the list.
   */
  function off(event, handler) {
    this.eventEmitter.removeEventHandler(event, handler);
    return this;
  }

  function initialize() {
    // Add window resize listener that re-creates the chart
    window.addEventListener('resize', this.resizeListener);

    // Obtain current options based on matching media queries (if responsive options are given)
    // This will also register a listener that is re-creating the chart based on media changes
    this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
    // Register options change listener that will trigger a chart update
    this.eventEmitter.addEventHandler('optionsChanged', function() {
      this.update();
    }.bind(this));

    // Before the first chart creation we need to register us with all plugins that are configured
    // Initialize all relevant plugins with our chart object and the plugin options specified in the config
    if(this.options.plugins) {
      this.options.plugins.forEach(function(plugin) {
        if(plugin instanceof Array) {
          plugin[0](this, plugin[1]);
        } else {
          plugin(this);
        }
      }.bind(this));
    }

    // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
    this.eventEmitter.emit('data', {
      type: 'initial',
      data: this.data
    });

    // Create the first chart
    this.createChart(this.optionsProvider.getCurrentOptions());

    // As chart is initialized from the event loop now we can reset our timeout reference
    // This is important if the chart gets initialized on the same element twice
    this.initializeTimeoutId = undefined;
  }

  /**
   * Constructor of chart base class.
   *
   * @param query
   * @param data
   * @param defaultOptions
   * @param options
   * @param responsiveOptions
   * @constructor
   */
  function Base(query, data, defaultOptions, options, responsiveOptions) {
    this.container = Chartist.querySelector(query);
    this.data = data || {};
    this.data.labels = this.data.labels || [];
    this.data.series = this.data.series || [];
    this.defaultOptions = defaultOptions;
    this.options = options;
    this.responsiveOptions = responsiveOptions;
    this.eventEmitter = Chartist.EventEmitter();
    this.supportsForeignObject = Chartist.Svg.isSupported('Extensibility');
    this.supportsAnimations = Chartist.Svg.isSupported('AnimationEventsAttribute');
    this.resizeListener = function resizeListener(){
      this.update();
    }.bind(this);

    if(this.container) {
      // If chartist was already initialized in this container we are detaching all event listeners first
      if(this.container.__chartist__) {
        this.container.__chartist__.detach();
      }

      this.container.__chartist__ = this;
    }

    // Using event loop for first draw to make it possible to register event listeners in the same call stack where
    // the chart was created.
    this.initializeTimeoutId = setTimeout(initialize.bind(this), 0);
  }

  // Creating the chart base class
  Chartist.Base = Chartist.Class.extend({
    constructor: Base,
    optionsProvider: undefined,
    container: undefined,
    svg: undefined,
    eventEmitter: undefined,
    createChart: function() {
      throw new Error('Base chart type can\'t be instantiated!');
    },
    update: update,
    detach: detach,
    on: on,
    off: off,
    version: Chartist.version,
    supportsForeignObject: false
  });

}(this, Chartist));
;/**
 * Chartist SVG module for simple SVG DOM abstraction
 *
 * @module Chartist.Svg
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  var document = globalRoot.document;

  /**
   * Chartist.Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
   *
   * @memberof Chartist.Svg
   * @constructor
   * @param {String|Element} name The name of the SVG element to create or an SVG dom element which should be wrapped into Chartist.Svg
   * @param {Object} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} className This class or class list will be added to the SVG element
   * @param {Object} parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
   * @param {Boolean} insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   */
  function Svg(name, attributes, className, parent, insertFirst) {
    // If Svg is getting called with an SVG element we just return the wrapper
    if(name instanceof Element) {
      this._node = name;
    } else {
      this._node = document.createElementNS(Chartist.namespaces.svg, name);

      // If this is an SVG element created then custom namespace
      if(name === 'svg') {
        this.attr({
          'xmlns:ct': Chartist.namespaces.ct
        });
      }
    }

    if(attributes) {
      this.attr(attributes);
    }

    if(className) {
      this.addClass(className);
    }

    if(parent) {
      if (insertFirst && parent._node.firstChild) {
        parent._node.insertBefore(this._node, parent._node.firstChild);
      } else {
        parent._node.appendChild(this._node);
      }
    }
  }

  /**
   * Set attributes on the current SVG element of the wrapper you're currently working on.
   *
   * @memberof Chartist.Svg
   * @param {Object|String} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added. If this parameter is a String then the function is used as a getter and will return the attribute value.
   * @param {String} [ns] If specified, the attribute will be obtained using getAttributeNs. In order to write namepsaced attributes you can use the namespace:attribute notation within the attributes object.
   * @return {Object|String} The current wrapper object will be returned so it can be used for chaining or the attribute value if used as getter function.
   */
  function attr(attributes, ns) {
    if(typeof attributes === 'string') {
      if(ns) {
        return this._node.getAttributeNS(ns, attributes);
      } else {
        return this._node.getAttribute(attributes);
      }
    }

    Object.keys(attributes).forEach(function(key) {
      // If the attribute value is undefined we can skip this one
      if(attributes[key] === undefined) {
        return;
      }

      if (key.indexOf(':') !== -1) {
        var namespacedAttribute = key.split(':');
        this._node.setAttributeNS(Chartist.namespaces[namespacedAttribute[0]], key, attributes[key]);
      } else {
        this._node.setAttribute(key, attributes[key]);
      }
    }.bind(this));

    return this;
  }

  /**
   * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
   *
   * @memberof Chartist.Svg
   * @param {String} name The name of the SVG element that should be created as child element of the currently selected element wrapper
   * @param {Object} [attributes] An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element
   * @param {Boolean} [insertFirst] If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper object that can be used to modify the containing SVG data
   */
  function elem(name, attributes, className, insertFirst) {
    return new Chartist.Svg(name, attributes, className, this, insertFirst);
  }

  /**
   * Returns the parent Chartist.SVG wrapper object
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
   */
  function parent() {
    return this._node.parentNode instanceof SVGElement ? new Chartist.Svg(this._node.parentNode) : null;
  }

  /**
   * This method returns a Chartist.Svg wrapper around the root SVG element of the current tree.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The root SVG element wrapped in a Chartist.Svg element
   */
  function root() {
    var node = this._node;
    while(node.nodeName !== 'svg') {
      node = node.parentNode;
    }
    return new Chartist.Svg(node);
  }

  /**
   * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Chartist.Svg wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} selector A CSS selector that is used to query for child SVG elements
   * @return {Chartist.Svg} The SVG wrapper for the element found or null if no element was found
   */
  function querySelector(selector) {
    var foundNode = this._node.querySelector(selector);
    return foundNode ? new Chartist.Svg(foundNode) : null;
  }

  /**
   * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Chartist.Svg.List wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} selector A CSS selector that is used to query for child SVG elements
   * @return {Chartist.Svg.List} The SVG wrapper list for the element found or null if no element was found
   */
  function querySelectorAll(selector) {
    var foundNodes = this._node.querySelectorAll(selector);
    return foundNodes.length ? new Chartist.Svg.List(foundNodes) : null;
  }

  /**
   * Returns the underlying SVG node for the current element.
   *
   * @memberof Chartist.Svg
   * @returns {Node}
   */
  function getNode() {
    return this._node;
  }

  /**
   * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
   *
   * @memberof Chartist.Svg
   * @param {Node|String} content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
   * @param {String} [attributes] An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element
   * @param {Boolean} [insertFirst] Specifies if the foreignObject should be inserted as first child
   * @return {Chartist.Svg} New wrapper object that wraps the foreignObject element
   */
  function foreignObject(content, attributes, className, insertFirst) {
    // If content is string then we convert it to DOM
    // TODO: Handle case where content is not a string nor a DOM Node
    if(typeof content === 'string') {
      var container = document.createElement('div');
      container.innerHTML = content;
      content = container.firstChild;
    }

    // Adding namespace to content element
    content.setAttribute('xmlns', Chartist.namespaces.xmlns);

    // Creating the foreignObject without required extension attribute (as described here
    // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)
    var fnObj = this.elem('foreignObject', attributes, className, insertFirst);

    // Add content to foreignObjectElement
    fnObj._node.appendChild(content);

    return fnObj;
  }

  /**
   * This method adds a new text element to the current Chartist.Svg wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} t The text that should be added to the text element that is created
   * @return {Chartist.Svg} The same wrapper object that was used to add the newly created element
   */
  function text(t) {
    this._node.appendChild(document.createTextNode(t));
    return this;
  }

  /**
   * This method will clear all child nodes of the current wrapper object.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The same wrapper object that got emptied
   */
  function empty() {
    while (this._node.firstChild) {
      this._node.removeChild(this._node.firstChild);
    }

    return this;
  }

  /**
   * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The parent wrapper object of the element that got removed
   */
  function remove() {
    this._node.parentNode.removeChild(this._node);
    return this.parent();
  }

  /**
   * This method will replace the element with a new element that can be created outside of the current DOM.
   *
   * @memberof Chartist.Svg
   * @param {Chartist.Svg} newElement The new Chartist.Svg object that will be used to replace the current wrapper object
   * @return {Chartist.Svg} The wrapper of the new element
   */
  function replace(newElement) {
    this._node.parentNode.replaceChild(newElement._node, this._node);
    return newElement;
  }

  /**
   * This method will append an element to the current element as a child.
   *
   * @memberof Chartist.Svg
   * @param {Chartist.Svg} element The Chartist.Svg element that should be added as a child
   * @param {Boolean} [insertFirst] Specifies if the element should be inserted as first child
   * @return {Chartist.Svg} The wrapper of the appended object
   */
  function append(element, insertFirst) {
    if(insertFirst && this._node.firstChild) {
      this._node.insertBefore(element._node, this._node.firstChild);
    } else {
      this._node.appendChild(element._node);
    }

    return this;
  }

  /**
   * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
   *
   * @memberof Chartist.Svg
   * @return {Array} A list of classes or an empty array if there are no classes on the current element
   */
  function classes() {
    return this._node.getAttribute('class') ? this._node.getAttribute('class').trim().split(/\s+/) : [];
  }

  /**
   * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
   *
   * @memberof Chartist.Svg
   * @param {String} names A white space separated list of class names
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function addClass(names) {
    this._node.setAttribute('class',
      this.classes(this._node)
        .concat(names.trim().split(/\s+/))
        .filter(function(elem, pos, self) {
          return self.indexOf(elem) === pos;
        }).join(' ')
    );

    return this;
  }

  /**
   * Removes one or a space separated list of classes from the current element.
   *
   * @memberof Chartist.Svg
   * @param {String} names A white space separated list of class names
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function removeClass(names) {
    var removedClasses = names.trim().split(/\s+/);

    this._node.setAttribute('class', this.classes(this._node).filter(function(name) {
      return removedClasses.indexOf(name) === -1;
    }).join(' '));

    return this;
  }

  /**
   * Removes all classes from the current element.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function removeAllClasses() {
    this._node.setAttribute('class', '');

    return this;
  }

  /**
   * Get element height using `getBoundingClientRect`
   *
   * @memberof Chartist.Svg
   * @return {Number} The elements height in pixels
   */
  function height() {
    return this._node.getBoundingClientRect().height;
  }

  /**
   * Get element width using `getBoundingClientRect`
   *
   * @memberof Chartist.Core
   * @return {Number} The elements width in pixels
   */
  function width() {
    return this._node.getBoundingClientRect().width;
  }

  /**
   * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Chartist.Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
   * **An animations object could look like this:**
   * ```javascript
   * element.animate({
   *   opacity: {
   *     dur: 1000,
   *     from: 0,
   *     to: 1
   *   },
   *   x1: {
   *     dur: '1000ms',
   *     from: 100,
   *     to: 200,
   *     easing: 'easeOutQuart'
   *   },
   *   y1: {
   *     dur: '2s',
   *     from: 0,
   *     to: 100
   *   }
   * });
   * ```
   * **Automatic unit conversion**
   * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
   * **Guided mode**
   * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Chartist.Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
   * If guided mode is enabled the following behavior is added:
   * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
   * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
   * - The animate element will be forced to use `fill="freeze"`
   * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
   * - After the animation the element attribute value will be set to the `to` value of the animation
   * - The animate element is deleted from the DOM
   *
   * @memberof Chartist.Svg
   * @param {Object} animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
   * @param {Boolean} guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
   * @param {Object} eventEmitter If specified, this event emitter will be notified when an animation starts or ends.
   * @return {Chartist.Svg} The current element where the animation was added
   */
  function animate(animations, guided, eventEmitter) {
    if(guided === undefined) {
      guided = true;
    }

    Object.keys(animations).forEach(function createAnimateForAttributes(attribute) {

      function createAnimate(animationDefinition, guided) {
        var attributeProperties = {},
          animate,
          timeout,
          easing;

        // Check if an easing is specified in the definition object and delete it from the object as it will not
        // be part of the animate element attributes.
        if(animationDefinition.easing) {
          // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object
          easing = animationDefinition.easing instanceof Array ?
            animationDefinition.easing :
            Chartist.Svg.Easing[animationDefinition.easing];
          delete animationDefinition.easing;
        }

        // If numeric dur or begin was provided we assume milli seconds
        animationDefinition.begin = Chartist.ensureUnit(animationDefinition.begin, 'ms');
        animationDefinition.dur = Chartist.ensureUnit(animationDefinition.dur, 'ms');

        if(easing) {
          animationDefinition.calcMode = 'spline';
          animationDefinition.keySplines = easing.join(' ');
          animationDefinition.keyTimes = '0;1';
        }

        // Adding "fill: freeze" if we are in guided mode and set initial attribute values
        if(guided) {
          animationDefinition.fill = 'freeze';
          // Animated property on our element should already be set to the animation from value in guided mode
          attributeProperties[attribute] = animationDefinition.from;
          this.attr(attributeProperties);

          // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin
          // which needs to be in ms aside
          timeout = Chartist.quantity(animationDefinition.begin || 0).value;
          animationDefinition.begin = 'indefinite';
        }

        animate = this.elem('animate', Chartist.extend({
          attributeName: attribute
        }, animationDefinition));

        if(guided) {
          // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
          setTimeout(function() {
            // If beginElement fails we set the animated attribute to the end position and remove the animate element
            // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occured in
            // the browser. (Currently FF 34 does not support animate elements in foreignObjects)
            try {
              animate._node.beginElement();
            } catch(err) {
              // Set animated attribute to current animated value
              attributeProperties[attribute] = animationDefinition.to;
              this.attr(attributeProperties);
              // Remove the animate element as it's no longer required
              animate.remove();
            }
          }.bind(this), timeout);
        }

        if(eventEmitter) {
          animate._node.addEventListener('beginEvent', function handleBeginEvent() {
            eventEmitter.emit('animationBegin', {
              element: this,
              animate: animate._node,
              params: animationDefinition
            });
          }.bind(this));
        }

        animate._node.addEventListener('endEvent', function handleEndEvent() {
          if(eventEmitter) {
            eventEmitter.emit('animationEnd', {
              element: this,
              animate: animate._node,
              params: animationDefinition
            });
          }

          if(guided) {
            // Set animated attribute to current animated value
            attributeProperties[attribute] = animationDefinition.to;
            this.attr(attributeProperties);
            // Remove the animate element as it's no longer required
            animate.remove();
          }
        }.bind(this));
      }

      // If current attribute is an array of definition objects we create an animate for each and disable guided mode
      if(animations[attribute] instanceof Array) {
        animations[attribute].forEach(function(animationDefinition) {
          createAnimate.bind(this)(animationDefinition, false);
        }.bind(this));
      } else {
        createAnimate.bind(this)(animations[attribute], guided);
      }

    }.bind(this));

    return this;
  }

  Chartist.Svg = Chartist.Class.extend({
    constructor: Svg,
    attr: attr,
    elem: elem,
    parent: parent,
    root: root,
    querySelector: querySelector,
    querySelectorAll: querySelectorAll,
    getNode: getNode,
    foreignObject: foreignObject,
    text: text,
    empty: empty,
    remove: remove,
    replace: replace,
    append: append,
    classes: classes,
    addClass: addClass,
    removeClass: removeClass,
    removeAllClasses: removeAllClasses,
    height: height,
    width: width,
    animate: animate
  });

  /**
   * This method checks for support of a given SVG feature like Extensibility, SVG-animation or the like. Check http://www.w3.org/TR/SVG11/feature for a detailed list.
   *
   * @memberof Chartist.Svg
   * @param {String} feature The SVG 1.1 feature that should be checked for support.
   * @return {Boolean} True of false if the feature is supported or not
   */
  Chartist.Svg.isSupported = function(feature) {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#' + feature, '1.1');
  };

  /**
   * This Object contains some standard easing cubic bezier curves. Then can be used with their name in the `Chartist.Svg.animate`. You can also extend the list and use your own name in the `animate` function. Click the show code button to see the available bezier functions.
   *
   * @memberof Chartist.Svg
   */
  var easingCubicBeziers = {
    easeInSine: [0.47, 0, 0.745, 0.715],
    easeOutSine: [0.39, 0.575, 0.565, 1],
    easeInOutSine: [0.445, 0.05, 0.55, 0.95],
    easeInQuad: [0.55, 0.085, 0.68, 0.53],
    easeOutQuad: [0.25, 0.46, 0.45, 0.94],
    easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
    easeInCubic: [0.55, 0.055, 0.675, 0.19],
    easeOutCubic: [0.215, 0.61, 0.355, 1],
    easeInOutCubic: [0.645, 0.045, 0.355, 1],
    easeInQuart: [0.895, 0.03, 0.685, 0.22],
    easeOutQuart: [0.165, 0.84, 0.44, 1],
    easeInOutQuart: [0.77, 0, 0.175, 1],
    easeInQuint: [0.755, 0.05, 0.855, 0.06],
    easeOutQuint: [0.23, 1, 0.32, 1],
    easeInOutQuint: [0.86, 0, 0.07, 1],
    easeInExpo: [0.95, 0.05, 0.795, 0.035],
    easeOutExpo: [0.19, 1, 0.22, 1],
    easeInOutExpo: [1, 0, 0, 1],
    easeInCirc: [0.6, 0.04, 0.98, 0.335],
    easeOutCirc: [0.075, 0.82, 0.165, 1],
    easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
    easeInBack: [0.6, -0.28, 0.735, 0.045],
    easeOutBack: [0.175, 0.885, 0.32, 1.275],
    easeInOutBack: [0.68, -0.55, 0.265, 1.55]
  };

  Chartist.Svg.Easing = easingCubicBeziers;

  /**
   * This helper class is to wrap multiple `Chartist.Svg` elements into a list where you can call the `Chartist.Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Chartist.Svg` on multiple elements.
   * An instance of this class is also returned by `Chartist.Svg.querySelectorAll`.
   *
   * @memberof Chartist.Svg
   * @param {Array<Node>|NodeList} nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
   * @constructor
   */
  function SvgList(nodeList) {
    var list = this;

    this.svgElements = [];
    for(var i = 0; i < nodeList.length; i++) {
      this.svgElements.push(new Chartist.Svg(nodeList[i]));
    }

    // Add delegation methods for Chartist.Svg
    Object.keys(Chartist.Svg.prototype).filter(function(prototypeProperty) {
      return ['constructor',
          'parent',
          'querySelector',
          'querySelectorAll',
          'replace',
          'append',
          'classes',
          'height',
          'width'].indexOf(prototypeProperty) === -1;
    }).forEach(function(prototypeProperty) {
      list[prototypeProperty] = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        list.svgElements.forEach(function(element) {
          Chartist.Svg.prototype[prototypeProperty].apply(element, args);
        });
        return list;
      };
    });
  }

  Chartist.Svg.List = Chartist.Class.extend({
    constructor: SvgList
  });
}(this, Chartist));
;/**
 * Chartist SVG path module for SVG path description creation and modification.
 *
 * @module Chartist.Svg.Path
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  /**
   * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
   *
   * @memberof Chartist.Svg.Path
   * @type {Object}
   */
  var elementDescriptions = {
    m: ['x', 'y'],
    l: ['x', 'y'],
    c: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
    a: ['rx', 'ry', 'xAr', 'lAf', 'sf', 'x', 'y']
  };

  /**
   * Default options for newly created SVG path objects.
   *
   * @memberof Chartist.Svg.Path
   * @type {Object}
   */
  var defaultOptions = {
    // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
    accuracy: 3
  };

  function element(command, params, pathElements, pos, relative, data) {
    var pathElement = Chartist.extend({
      command: relative ? command.toLowerCase() : command.toUpperCase()
    }, params, data ? { data: data } : {} );

    pathElements.splice(pos, 0, pathElement);
  }

  function forEachParam(pathElements, cb) {
    pathElements.forEach(function(pathElement, pathElementIndex) {
      elementDescriptions[pathElement.command.toLowerCase()].forEach(function(paramName, paramIndex) {
        cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
      });
    });
  }

  /**
   * Used to construct a new path object.
   *
   * @memberof Chartist.Svg.Path
   * @param {Boolean} close If set to true then this path will be closed when stringified (with a Z at the end)
   * @param {Object} options Options object that overrides the default objects. See default options for more details.
   * @constructor
   */
  function SvgPath(close, options) {
    this.pathElements = [];
    this.pos = 0;
    this.close = close;
    this.options = Chartist.extend({}, defaultOptions, options);
  }

  /**
   * Gets or sets the current position (cursor) inside of the path. You can move around the cursor freely but limited to 0 or the count of existing elements. All modifications with element functions will insert new elements at the position of this cursor.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} [pos] If a number is passed then the cursor is set to this position in the path element array.
   * @return {Chartist.Svg.Path|Number} If the position parameter was passed then the return value will be the path object for easy call chaining. If no position parameter was passed then the current position is returned.
   */
  function position(pos) {
    if(pos !== undefined) {
      this.pos = Math.max(0, Math.min(this.pathElements.length, pos));
      return this;
    } else {
      return this.pos;
    }
  }

  /**
   * Removes elements from the path starting at the current position.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} count Number of path elements that should be removed from the current position.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function remove(count) {
    this.pathElements.splice(this.pos, count);
    return this;
  }

  /**
   * Use this function to add a new move SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The x coordinate for the move element.
   * @param {Number} y The y coordinate for the move element.
   * @param {Boolean} [relative] If set to true the move element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function move(x, y, relative, data) {
    element('M', {
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new line SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The x coordinate for the line element.
   * @param {Number} y The y coordinate for the line element.
   * @param {Boolean} [relative] If set to true the line element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function line(x, y, relative, data) {
    element('L', {
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new curve SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x1 The x coordinate for the first control point of the bezier curve.
   * @param {Number} y1 The y coordinate for the first control point of the bezier curve.
   * @param {Number} x2 The x coordinate for the second control point of the bezier curve.
   * @param {Number} y2 The y coordinate for the second control point of the bezier curve.
   * @param {Number} x The x coordinate for the target point of the curve element.
   * @param {Number} y The y coordinate for the target point of the curve element.
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function curve(x1, y1, x2, y2, x, y, relative, data) {
    element('C', {
      x1: +x1,
      y1: +y1,
      x2: +x2,
      y2: +y2,
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new non-bezier curve SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} rx The radius to be used for the x-axis of the arc.
   * @param {Number} ry The radius to be used for the y-axis of the arc.
   * @param {Number} xAr Defines the orientation of the arc
   * @param {Number} lAf Large arc flag
   * @param {Number} sf Sweep flag
   * @param {Number} x The x coordinate for the target point of the curve element.
   * @param {Number} y The y coordinate for the target point of the curve element.
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function arc(rx, ry, xAr, lAf, sf, x, y, relative, data) {
    element('A', {
      rx: +rx,
      ry: +ry,
      xAr: +xAr,
      lAf: +lAf,
      sf: +sf,
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
   *
   * @memberof Chartist.Svg.Path
   * @param {String} path Any SVG path that contains move (m), line (l) or curve (c) components.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function parse(path) {
    // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]
    var chunks = path.replace(/([A-Za-z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([A-Za-z])/g, '$1 $2')
      .split(/[\s,]+/)
      .reduce(function(result, element) {
        if(element.match(/[A-Za-z]/)) {
          result.push([]);
        }

        result[result.length - 1].push(element);
        return result;
      }, []);

    // If this is a closed path we remove the Z at the end because this is determined by the close option
    if(chunks[chunks.length - 1][0].toUpperCase() === 'Z') {
      chunks.pop();
    }

    // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
    // For example {command: 'M', x: '10', y: '10'}
    var elements = chunks.map(function(chunk) {
        var command = chunk.shift(),
          description = elementDescriptions[command.toLowerCase()];

        return Chartist.extend({
          command: command
        }, description.reduce(function(result, paramName, index) {
          result[paramName] = +chunk[index];
          return result;
        }, {}));
      });

    // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position
    var spliceArgs = [this.pos, 0];
    Array.prototype.push.apply(spliceArgs, elements);
    Array.prototype.splice.apply(this.pathElements, spliceArgs);
    // Increase the internal position by the element count
    this.pos += elements.length;

    return this;
  }

  /**
   * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
   *
   * @memberof Chartist.Svg.Path
   * @return {String}
   */
  function stringify() {
    var accuracyMultiplier = Math.pow(10, this.options.accuracy);

    return this.pathElements.reduce(function(path, pathElement) {
        var params = elementDescriptions[pathElement.command.toLowerCase()].map(function(paramName) {
          return this.options.accuracy ?
            (Math.round(pathElement[paramName] * accuracyMultiplier) / accuracyMultiplier) :
            pathElement[paramName];
        }.bind(this));

        return path + pathElement.command + params.join(',');
      }.bind(this), '') + (this.close ? 'Z' : '');
  }

  /**
   * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The number which will be used to scale the x, x1 and x2 of all path elements.
   * @param {Number} y The number which will be used to scale the y, y1 and y2 of all path elements.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function scale(x, y) {
    forEachParam(this.pathElements, function(pathElement, paramName) {
      pathElement[paramName] *= paramName[0] === 'x' ? x : y;
    });
    return this;
  }

  /**
   * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The number which will be used to translate the x, x1 and x2 of all path elements.
   * @param {Number} y The number which will be used to translate the y, y1 and y2 of all path elements.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function translate(x, y) {
    forEachParam(this.pathElements, function(pathElement, paramName) {
      pathElement[paramName] += paramName[0] === 'x' ? x : y;
    });
    return this;
  }

  /**
   * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
   * The method signature of the callback function looks like this:
   * ```javascript
   * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)
   * ```
   * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Function} transformFnc The callback function for the transformation. Check the signature in the function description.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function transform(transformFnc) {
    forEachParam(this.pathElements, function(pathElement, paramName, pathElementIndex, paramIndex, pathElements) {
      var transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
      if(transformed || transformed === 0) {
        pathElement[paramName] = transformed;
      }
    });
    return this;
  }

  /**
   * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
   *
   * @memberof Chartist.Svg.Path
   * @param {Boolean} [close] Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
   * @return {Chartist.Svg.Path}
   */
  function clone(close) {
    var c = new Chartist.Svg.Path(close || this.close);
    c.pos = this.pos;
    c.pathElements = this.pathElements.slice().map(function cloneElements(pathElement) {
      return Chartist.extend({}, pathElement);
    });
    c.options = Chartist.extend({}, this.options);
    return c;
  }

  /**
   * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
   *
   * @memberof Chartist.Svg.Path
   * @param {String} command The command you'd like to use to split the path
   * @return {Array<Chartist.Svg.Path>}
   */
  function splitByCommand(command) {
    var split = [
      new Chartist.Svg.Path()
    ];

    this.pathElements.forEach(function(pathElement) {
      if(pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {
        split.push(new Chartist.Svg.Path());
      }

      split[split.length - 1].pathElements.push(pathElement);
    });

    return split;
  }

  /**
   * This static function on `Chartist.Svg.Path` is joining multiple paths together into one paths.
   *
   * @memberof Chartist.Svg.Path
   * @param {Array<Chartist.Svg.Path>} paths A list of paths to be joined together. The order is important.
   * @param {boolean} close If the newly created path should be a closed path
   * @param {Object} options Path options for the newly created path.
   * @return {Chartist.Svg.Path}
   */

  function join(paths, close, options) {
    var joinedPath = new Chartist.Svg.Path(close, options);
    for(var i = 0; i < paths.length; i++) {
      var path = paths[i];
      for(var j = 0; j < path.pathElements.length; j++) {
        joinedPath.pathElements.push(path.pathElements[j]);
      }
    }
    return joinedPath;
  }

  Chartist.Svg.Path = Chartist.Class.extend({
    constructor: SvgPath,
    position: position,
    remove: remove,
    move: move,
    line: line,
    curve: curve,
    arc: arc,
    scale: scale,
    translate: translate,
    transform: transform,
    parse: parse,
    stringify: stringify,
    clone: clone,
    splitByCommand: splitByCommand
  });

  Chartist.Svg.Path.elementDescriptions = elementDescriptions;
  Chartist.Svg.Path.join = join;
}(this, Chartist));
;/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  var axisUnits = {
    x: {
      pos: 'x',
      len: 'width',
      dir: 'horizontal',
      rectStart: 'x1',
      rectEnd: 'x2',
      rectOffset: 'y2'
    },
    y: {
      pos: 'y',
      len: 'height',
      dir: 'vertical',
      rectStart: 'y2',
      rectEnd: 'y1',
      rectOffset: 'x1'
    }
  };

  function Axis(units, chartRect, ticks, options) {
    this.units = units;
    this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;
    this.chartRect = chartRect;
    this.axisLength = chartRect[units.rectEnd] - chartRect[units.rectStart];
    this.gridOffset = chartRect[units.rectOffset];
    this.ticks = ticks;
    this.options = options;
  }

  function createGridAndLabels(gridGroup, labelGroup, useForeignObject, chartOptions, eventEmitter) {
    var axisOptions = chartOptions['axis' + this.units.pos.toUpperCase()];
    var projectedValues = this.ticks.map(this.projectValue.bind(this));
    var labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);

    projectedValues.forEach(function(projectedValue, index) {
      var labelOffset = {
        x: 0,
        y: 0
      };

      // TODO: Find better solution for solving this problem
      // Calculate how much space we have available for the label
      var labelLength;
      if(projectedValues[index + 1]) {
        // If we still have one label ahead, we can calculate the distance to the next tick / label
        labelLength = projectedValues[index + 1] - projectedValue;
      } else {
        // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
        // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will
        // still be visible inside of the chart padding.
        labelLength = Math.max(this.axisLength - projectedValue, 30);
      }

      // Skip grid lines and labels where interpolated label values are falsey (execpt for 0)
      if(Chartist.isFalseyButZero(labelValues[index]) && labelValues[index] !== '') {
        return;
      }

      // Transform to global coordinates using the chartRect
      // We also need to set the label offset for the createLabel function
      if(this.units.pos === 'x') {
        projectedValue = this.chartRect.x1 + projectedValue;
        labelOffset.x = chartOptions.axisX.labelOffset.x;

        // If the labels should be positioned in start position (top side for vertical axis) we need to set a
        // different offset as for positioned with end (bottom)
        if(chartOptions.axisX.position === 'start') {
          labelOffset.y = this.chartRect.padding.top + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
        } else {
          labelOffset.y = this.chartRect.y1 + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
        }
      } else {
        projectedValue = this.chartRect.y1 - projectedValue;
        labelOffset.y = chartOptions.axisY.labelOffset.y - (useForeignObject ? labelLength : 0);

        // If the labels should be positioned in start position (left side for horizontal axis) we need to set a
        // different offset as for positioned with end (right side)
        if(chartOptions.axisY.position === 'start') {
          labelOffset.x = useForeignObject ? this.chartRect.padding.left + chartOptions.axisY.labelOffset.x : this.chartRect.x1 - 10;
        } else {
          labelOffset.x = this.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;
        }
      }

      if(axisOptions.showGrid) {
        Chartist.createGrid(projectedValue, index, this, this.gridOffset, this.chartRect[this.counterUnits.len](), gridGroup, [
          chartOptions.classNames.grid,
          chartOptions.classNames[this.units.dir]
        ], eventEmitter);
      }

      if(axisOptions.showLabel) {
        Chartist.createLabel(projectedValue, labelLength, index, labelValues, this, axisOptions.offset, labelOffset, labelGroup, [
          chartOptions.classNames.label,
          chartOptions.classNames[this.units.dir],
          (axisOptions.position === 'start' ? chartOptions.classNames[axisOptions.position] : chartOptions.classNames['end'])
        ], useForeignObject, eventEmitter);
      }
    }.bind(this));
  }

  Chartist.Axis = Chartist.Class.extend({
    constructor: Axis,
    createGridAndLabels: createGridAndLabels,
    projectValue: function(value, index, data) {
      throw new Error('Base axis can\'t be instantiated!');
    }
  });

  Chartist.Axis.units = axisUnits;

}(this, Chartist));
;/**
 * The auto scale axis uses standard linear scale projection of values along an axis. It uses order of magnitude to find a scale automatically and evaluates the available space in order to find the perfect amount of ticks for your chart.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,
 *   // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
 *   scaleMinSpace: 20,
 *   // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
 *   onlyInteger: true,
 *   // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
 *   referenceValue: 5
 * };
 * ```
 *
 * @module Chartist.AutoScaleAxis
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  function AutoScaleAxis(axisUnit, data, chartRect, options) {
    // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
    var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
    this.bounds = Chartist.getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
    this.range = {
      min: this.bounds.min,
      max: this.bounds.max
    };

    Chartist.AutoScaleAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      this.bounds.values,
      options);
  }

  function projectValue(value) {
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.bounds.min) / this.bounds.range;
  }

  Chartist.AutoScaleAxis = Chartist.Axis.extend({
    constructor: AutoScaleAxis,
    projectValue: projectValue
  });

}(this, Chartist));
;/**
 * The fixed scale axis uses standard linear projection of values along an axis. It makes use of a divisor option to divide the range provided from the minimum and maximum value or the options high and low that will override the computed minimum and maximum.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,
 *   // If specified then the value range determined from minimum to maximum (or low and high) will be divided by this number and ticks will be generated at those division points. The default divisor is 1.
 *   divisor: 4,
 *   // If ticks is explicitly set, then the axis will not compute the ticks with the divisor, but directly use the data in ticks to determine at what points on the axis a tick need to be generated.
 *   ticks: [1, 10, 20, 30]
 * };
 * ```
 *
 * @module Chartist.FixedScaleAxis
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  function FixedScaleAxis(axisUnit, data, chartRect, options) {
    var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
    this.divisor = options.divisor || 1;
    this.ticks = options.ticks || Chartist.times(this.divisor).map(function(value, index) {
      return highLow.low + (highLow.high - highLow.low) / this.divisor * index;
    }.bind(this));
    this.ticks.sort(function(a, b) {
      return a - b;
    });
    this.range = {
      min: highLow.low,
      max: highLow.high
    };

    Chartist.FixedScaleAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      this.ticks,
      options);

    this.stepLength = this.axisLength / this.divisor;
  }

  function projectValue(value) {
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.range.min) / (this.range.max - this.range.min);
  }

  Chartist.FixedScaleAxis = Chartist.Axis.extend({
    constructor: FixedScaleAxis,
    projectValue: projectValue
  });

}(this, Chartist));
;/**
 * The step axis for step based charts like bar chart or step based line charts. It uses a fixed amount of ticks that will be equally distributed across the whole axis length. The projection is done using the index of the data value rather than the value itself and therefore it's only useful for distribution purpose.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // Ticks to be used to distribute across the axis length. As this axis type relies on the index of the value rather than the value, arbitrary data that can be converted to a string can be used as ticks.
 *   ticks: ['One', 'Two', 'Three'],
 *   // If set to true the full width will be used to distribute the values where the last value will be at the maximum of the axis length. If false the spaces between the ticks will be evenly distributed instead.
 *   stretch: true
 * };
 * ```
 *
 * @module Chartist.StepAxis
 */
/* global Chartist */
(function (globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  function StepAxis(axisUnit, data, chartRect, options) {
    Chartist.StepAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      options.ticks,
      options);

    var calc = Math.max(1, options.ticks.length - (options.stretch ? 1 : 0));
    this.stepLength = this.axisLength / calc;
  }

  function projectValue(value, index) {
    return this.stepLength * index;
  }

  Chartist.StepAxis = Chartist.Axis.extend({
    constructor: StepAxis,
    projectValue: projectValue
  });

}(this, Chartist));
;/**
 * The Chartist line chart can be used to draw Line or Scatter charts. If used in the browser you can access the global `Chartist` namespace where you find the `Line` function as a main entry point.
 *
 * For examples on how to use the line chart please check the examples of the `Chartist.Line` method.
 *
 * @module Chartist.Line
 */
/* global Chartist */
(function(globalRoot, Chartist){
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Line
   */
  var defaultOptions = {
    // Options for X-Axis
    axisX: {
      // The offset of the labels to the chart area
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the labels to the chart area
      offset: 40,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined,
      // This value specifies the minimum height in pixel of the scale steps
      scaleMinSpace: 20,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // If the line should be drawn or not
    showLine: true,
    // If dots should be drawn or not
    showPoint: true,
    // If the line chart should draw an area
    showArea: false,
    // The base for the area chart that will be used to close the area shape (is normally 0)
    areaBase: 0,
    // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
    lineSmooth: true,
    // If the line chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
      top: 15,
      right: 15,
      bottom: 5,
      left: 10
    },
    // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
    fullWidth: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: 'ct-chart-line',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      line: 'ct-line',
      point: 'ct-point',
      area: 'ct-area',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      gridBackground: 'ct-grid-background',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
  };

  /**
   * Creates a new chart
   *
   */
  function createChart(options) {
    var data = Chartist.normalizeData(this.data, options.reverseData, true);

    // Create new svg object
    this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart);
    // Create groups for labels, grid and series
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
    var seriesGroup = this.svg.elem('g');
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
    var axisX, axisY;

    if(options.axisX.type === undefined) {
      axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
        ticks: data.normalized.labels,
        stretch: options.fullWidth
      }));
    } else {
      axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
    }

    if(options.axisY.type === undefined) {
      axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
        high: Chartist.isNumeric(options.high) ? options.high : options.axisY.high,
        low: Chartist.isNumeric(options.low) ? options.low : options.axisY.low
      }));
    } else {
      axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
    }

    axisX.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
    axisY.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

    if (options.showGridBackground) {
      Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
    }

    // Draw the series
    data.raw.series.forEach(function(series, seriesIndex) {
      var seriesElement = seriesGroup.elem('g');

      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({
        'ct:series-name': series.name,
        'ct:meta': Chartist.serialize(series.meta)
      });

      // Use series class from series data or if not set generate one
      seriesElement.addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))
      ].join(' '));

      var pathCoordinates = [],
        pathData = [];

      data.normalized.series[seriesIndex].forEach(function(value, valueIndex) {
        var p = {
          x: chartRect.x1 + axisX.projectValue(value, valueIndex, data.normalized.series[seriesIndex]),
          y: chartRect.y1 - axisY.projectValue(value, valueIndex, data.normalized.series[seriesIndex])
        };
        pathCoordinates.push(p.x, p.y);
        pathData.push({
          value: value,
          valueIndex: valueIndex,
          meta: Chartist.getMetaData(series, valueIndex)
        });
      }.bind(this));

      var seriesOptions = {
        lineSmooth: Chartist.getSeriesOption(series, options, 'lineSmooth'),
        showPoint: Chartist.getSeriesOption(series, options, 'showPoint'),
        showLine: Chartist.getSeriesOption(series, options, 'showLine'),
        showArea: Chartist.getSeriesOption(series, options, 'showArea'),
        areaBase: Chartist.getSeriesOption(series, options, 'areaBase')
      };

      var smoothing = typeof seriesOptions.lineSmooth === 'function' ?
        seriesOptions.lineSmooth : (seriesOptions.lineSmooth ? Chartist.Interpolation.monotoneCubic() : Chartist.Interpolation.none());
      // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
      // index, value and meta data
      var path = smoothing(pathCoordinates, pathData);

      // If we should show points we need to create them now to avoid secondary loop
      // Points are drawn from the pathElements returned by the interpolation function
      // Small offset for Firefox to render squares correctly
      if (seriesOptions.showPoint) {

        path.pathElements.forEach(function(pathElement) {
          var point = seriesElement.elem('line', {
            x1: pathElement.x,
            y1: pathElement.y,
            x2: pathElement.x + 0.01,
            y2: pathElement.y
          }, options.classNames.point).attr({
            'ct:value': [pathElement.data.value.x, pathElement.data.value.y].filter(Chartist.isNumeric).join(','),
            'ct:meta': Chartist.serialize(pathElement.data.meta)
          });

          this.eventEmitter.emit('draw', {
            type: 'point',
            value: pathElement.data.value,
            index: pathElement.data.valueIndex,
            meta: pathElement.data.meta,
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            group: seriesElement,
            element: point,
            x: pathElement.x,
            y: pathElement.y
          });
        }.bind(this));
      }

      if(seriesOptions.showLine) {
        var line = seriesElement.elem('path', {
          d: path.stringify()
        }, options.classNames.line, true);

        this.eventEmitter.emit('draw', {
          type: 'line',
          values: data.normalized.series[seriesIndex],
          path: path.clone(),
          chartRect: chartRect,
          index: seriesIndex,
          series: series,
          seriesIndex: seriesIndex,
          seriesMeta: series.meta,
          axisX: axisX,
          axisY: axisY,
          group: seriesElement,
          element: line
        });
      }

      // Area currently only works with axes that support a range!
      if(seriesOptions.showArea && axisY.range) {
        // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that
        // the area is not drawn outside the chart area.
        var areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min);

        // We project the areaBase value into screen coordinates
        var areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase);

        // In order to form the area we'll first split the path by move commands so we can chunk it up into segments
        path.splitByCommand('M').filter(function onlySolidSegments(pathSegment) {
          // We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area
          return pathSegment.pathElements.length > 1;
        }).map(function convertToArea(solidPathSegments) {
          // Receiving the filtered solid path segments we can now convert those segments into fill areas
          var firstElement = solidPathSegments.pathElements[0];
          var lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1];

          // Cloning the solid path segment with closing option and removing the first move command from the clone
          // We then insert a new move that should start at the area base and draw a straight line up or down
          // at the end of the path we add an additional straight line to the projected area base value
          // As the closing option is set our path will be automatically closed
          return solidPathSegments.clone(true)
            .position(0)
            .remove(1)
            .move(firstElement.x, areaBaseProjected)
            .line(firstElement.x, firstElement.y)
            .position(solidPathSegments.pathElements.length + 1)
            .line(lastElement.x, areaBaseProjected);

        }).forEach(function createArea(areaPath) {
          // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
          // and adding the created DOM elements to the correct series group
          var area = seriesElement.elem('path', {
            d: areaPath.stringify()
          }, options.classNames.area, true);

          // Emit an event for each area that was drawn
          this.eventEmitter.emit('draw', {
            type: 'area',
            values: data.normalized.series[seriesIndex],
            path: areaPath.clone(),
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            chartRect: chartRect,
            index: seriesIndex,
            group: seriesElement,
            element: area
          });
        }.bind(this));
      }
    }.bind(this));

    this.eventEmitter.emit('created', {
      bounds: axisY.bounds,
      chartRect: chartRect,
      axisX: axisX,
      axisY: axisY,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new line chart.
   *
   * @memberof Chartist.Line
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object that needs to consist of a labels and a series array
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple line chart
   * var data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // As options we currently only set a static size of 300x200 px
   * var options = {
   *   width: '300px',
   *   height: '200px'
   * };
   *
   * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
   * new Chartist.Line('.ct-chart', data, options);
   *
   * @example
   * // Use specific interpolation function with configuration from the Chartist.Interpolation module
   *
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [
   *     [1, 1, 8, 1, 7]
   *   ]
   * }, {
   *   lineSmooth: Chartist.Interpolation.cardinal({
   *     tension: 0.2
   *   })
   * });
   *
   * @example
   * // Create a line chart with responsive options
   *
   * var data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
   * var responsiveOptions = [
   *   ['screen and (min-width: 641px) and (max-width: 1024px)', {
   *     showPoint: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return Mon, Tue, Wed etc. on medium screens
   *         return value.slice(0, 3);
   *       }
   *     }
   *   }],
   *   ['screen and (max-width: 640px)', {
   *     showLine: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return M, T, W etc. on small screens
   *         return value[0];
   *       }
   *     }
   *   }]
   * ];
   *
   * new Chartist.Line('.ct-chart', data, null, responsiveOptions);
   *
   */
  function Line(query, data, options, responsiveOptions) {
    Chartist.Line.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating line chart type in Chartist namespace
  Chartist.Line = Chartist.Base.extend({
    constructor: Line,
    createChart: createChart
  });

}(this, Chartist));
;/**
 * The bar chart module of Chartist that can be used to draw unipolar or bipolar bar and grouped bar charts.
 *
 * @module Chartist.Bar
 */
/* global Chartist */
(function(globalRoot, Chartist){
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * Default options in bar charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Bar
   */
  var defaultOptions = {
    // Options for X-Axis
    axisX: {
      // The offset of the chart drawing area to the border of the container
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // This value specifies the minimum width in pixel of the scale steps
      scaleMinSpace: 30,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the chart drawing area to the border of the container
      offset: 40,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // This value specifies the minimum height in pixel of the scale steps
      scaleMinSpace: 20,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
    referenceValue: 0,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
      top: 15,
      right: 15,
      bottom: 5,
      left: 10
    },
    // Specify the distance in pixel of bars in a group
    seriesBarDistance: 15,
    // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
    stackBars: false,
    // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
    // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
    stackMode: 'accumulate',
    // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
    horizontalBars: false,
    // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
    distributeSeries: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If the bar chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: 'ct-chart-bar',
      horizontalBars: 'ct-horizontal-bars',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      bar: 'ct-bar',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      gridBackground: 'ct-grid-background',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
  };

  /**
   * Creates a new chart
   *
   */
  function createChart(options) {
    var data;
    var highLow;

    if(options.distributeSeries) {
      data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
      data.normalized.series = data.normalized.series.map(function(value) {
        return [value];
      });
    } else {
      data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
    }

    // Create new svg element
    this.svg = Chartist.createSvg(
      this.container,
      options.width,
      options.height,
      options.classNames.chart + (options.horizontalBars ? ' ' + options.classNames.horizontalBars : '')
    );

    // Drawing groups in correct order
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
    var seriesGroup = this.svg.elem('g');
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

    if(options.stackBars && data.normalized.series.length !== 0) {

      // If stacked bars we need to calculate the high low from stacked values from each series
      var serialSums = Chartist.serialMap(data.normalized.series, function serialSums() {
        return Array.prototype.slice.call(arguments).map(function(value) {
          return value;
        }).reduce(function(prev, curr) {
          return {
            x: prev.x + (curr && curr.x) || 0,
            y: prev.y + (curr && curr.y) || 0
          };
        }, {x: 0, y: 0});
      });

      highLow = Chartist.getHighLow([serialSums], options, options.horizontalBars ? 'x' : 'y');

    } else {

      highLow = Chartist.getHighLow(data.normalized.series, options, options.horizontalBars ? 'x' : 'y');
    }

    // Overrides of high / low from settings
    highLow.high = +options.high || (options.high === 0 ? 0 : highLow.high);
    highLow.low = +options.low || (options.low === 0 ? 0 : highLow.low);

    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);

    var valueAxis,
      labelAxisTicks,
      labelAxis,
      axisX,
      axisY;

    // We need to set step count based on some options combinations
    if(options.distributeSeries && options.stackBars) {
      // If distributed series are enabled and bars need to be stacked, we'll only have one bar and therefore should
      // use only the first label for the step axis
      labelAxisTicks = data.normalized.labels.slice(0, 1);
    } else {
      // If distributed series are enabled but stacked bars aren't, we should use the series labels
      // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array
      // as the bars are normalized
      labelAxisTicks = data.normalized.labels;
    }

    // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.
    if(options.horizontalBars) {
      if(options.axisX.type === undefined) {
        valueAxis = axisX = new Chartist.AutoScaleAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,
          referenceValue: 0
        }));
      } else {
        valueAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,
          referenceValue: 0
        }));
      }

      if(options.axisY.type === undefined) {
        labelAxis = axisY = new Chartist.StepAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, {
          ticks: labelAxisTicks
        });
      } else {
        labelAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
      }
    } else {
      if(options.axisX.type === undefined) {
        labelAxis = axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, {
          ticks: labelAxisTicks
        });
      } else {
        labelAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
      }

      if(options.axisY.type === undefined) {
        valueAxis = axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,
          referenceValue: 0
        }));
      } else {
        valueAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,
          referenceValue: 0
        }));
      }
    }

    // Projected 0 point
    var zeroPoint = options.horizontalBars ? (chartRect.x1 + valueAxis.projectValue(0)) : (chartRect.y1 - valueAxis.projectValue(0));
    // Used to track the screen coordinates of stacked bars
    var stackedBarValues = [];

    labelAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
    valueAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

    if (options.showGridBackground) {
      Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
    }

    // Draw the series
    data.raw.series.forEach(function(series, seriesIndex) {
      // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.
      var biPol = seriesIndex - (data.raw.series.length - 1) / 2;
      // Half of the period width between vertical grid lines used to position bars
      var periodHalfLength;
      // Current series SVG element
      var seriesElement;

      // We need to set periodHalfLength based on some options combinations
      if(options.distributeSeries && !options.stackBars) {
        // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
        // which is the series count and divide by 2
        periodHalfLength = labelAxis.axisLength / data.normalized.series.length / 2;
      } else if(options.distributeSeries && options.stackBars) {
        // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
        // length by 2
        periodHalfLength = labelAxis.axisLength / 2;
      } else {
        // On regular bar charts we should just use the series length
        periodHalfLength = labelAxis.axisLength / data.normalized.series[seriesIndex].length / 2;
      }

      // Adding the series group to the series element
      seriesElement = seriesGroup.elem('g');

      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({
        'ct:series-name': series.name,
        'ct:meta': Chartist.serialize(series.meta)
      });

      // Use series class from series data or if not set generate one
      seriesElement.addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))
      ].join(' '));

      data.normalized.series[seriesIndex].forEach(function(value, valueIndex) {
        var projected,
          bar,
          previousStack,
          labelAxisValueIndex;

        // We need to set labelAxisValueIndex based on some options combinations
        if(options.distributeSeries && !options.stackBars) {
          // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
          // on the step axis for label positioning
          labelAxisValueIndex = seriesIndex;
        } else if(options.distributeSeries && options.stackBars) {
          // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use
          // 0 for projection on the label step axis
          labelAxisValueIndex = 0;
        } else {
          // On regular bar charts we just use the value index to project on the label step axis
          labelAxisValueIndex = valueIndex;
        }

        // We need to transform coordinates differently based on the chart layout
        if(options.horizontalBars) {
          projected = {
            x: chartRect.x1 + valueAxis.projectValue(value && value.x ? value.x : 0, valueIndex, data.normalized.series[seriesIndex]),
            y: chartRect.y1 - labelAxis.projectValue(value && value.y ? value.y : 0, labelAxisValueIndex, data.normalized.series[seriesIndex])
          };
        } else {
          projected = {
            x: chartRect.x1 + labelAxis.projectValue(value && value.x ? value.x : 0, labelAxisValueIndex, data.normalized.series[seriesIndex]),
            y: chartRect.y1 - valueAxis.projectValue(value && value.y ? value.y : 0, valueIndex, data.normalized.series[seriesIndex])
          }
        }

        // If the label axis is a step based axis we will offset the bar into the middle of between two steps using
        // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
        // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
        // add any automated positioning.
        if(labelAxis instanceof Chartist.StepAxis) {
          // Offset to center bar between grid lines, but only if the step axis is not stretched
          if(!labelAxis.options.stretch) {
            projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);
          }
          // Using bi-polar offset for multiple series if no stacked bars or series distribution is used
          projected[labelAxis.units.pos] += (options.stackBars || options.distributeSeries) ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
        }

        // Enter value in stacked bar values used to remember previous screen value for stacking up bars
        previousStack = stackedBarValues[valueIndex] || zeroPoint;
        stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]);

        // Skip if value is undefined
        if(value === undefined) {
          return;
        }

        var positions = {};
        positions[labelAxis.units.pos + '1'] = projected[labelAxis.units.pos];
        positions[labelAxis.units.pos + '2'] = projected[labelAxis.units.pos];

        if(options.stackBars && (options.stackMode === 'accumulate' || !options.stackMode)) {
          // Stack mode: accumulate (default)
          // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line
          // We want backwards compatibility, so the expected fallback without the 'stackMode' option
          // to be the original behaviour (accumulate)
          positions[labelAxis.counterUnits.pos + '1'] = previousStack;
          positions[labelAxis.counterUnits.pos + '2'] = stackedBarValues[valueIndex];
        } else {
          // Draw from the zero line normally
          // This is also the same code for Stack mode: overlap
          positions[labelAxis.counterUnits.pos + '1'] = zeroPoint;
          positions[labelAxis.counterUnits.pos + '2'] = projected[labelAxis.counterUnits.pos];
        }

        // Limit x and y so that they are within the chart rect
        positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);
        positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);
        positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);
        positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);

        var metaData = Chartist.getMetaData(series, valueIndex);

        // Create bar element
        bar = seriesElement.elem('line', positions, options.classNames.bar).attr({
          'ct:value': [value.x, value.y].filter(Chartist.isNumeric).join(','),
          'ct:meta': Chartist.serialize(metaData)
        });

        this.eventEmitter.emit('draw', Chartist.extend({
          type: 'bar',
          value: value,
          index: valueIndex,
          meta: metaData,
          series: series,
          seriesIndex: seriesIndex,
          axisX: axisX,
          axisY: axisY,
          chartRect: chartRect,
          group: seriesElement,
          element: bar
        }, positions));
      }.bind(this));
    }.bind(this));

    this.eventEmitter.emit('created', {
      bounds: valueAxis.bounds,
      chartRect: chartRect,
      axisX: axisX,
      axisY: axisY,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new bar chart and returns API object that you can use for later changes.
   *
   * @memberof Chartist.Bar
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object that needs to consist of a labels and a series array
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple bar chart
   * var data = {
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
   * new Chartist.Bar('.ct-chart', data);
   *
   * @example
   * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10
   * new Chartist.Bar('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5, 6, 7],
   *   series: [
   *     [1, 3, 2, -5, -3, 1, -6],
   *     [-5, -2, -4, -1, 2, -3, 1]
   *   ]
   * }, {
   *   seriesBarDistance: 12,
   *   low: -10,
   *   high: 10
   * });
   *
   */
  function Bar(query, data, options, responsiveOptions) {
    Chartist.Bar.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating bar chart type in Chartist namespace
  Chartist.Bar = Chartist.Base.extend({
    constructor: Bar,
    createChart: createChart
  });

}(this, Chartist));
;/**
 * The pie chart module of Chartist that can be used to draw pie, donut or gauge charts
 *
 * @module Chartist.Pie
 */
/* global Chartist */
(function(globalRoot, Chartist) {
  'use strict';

  var window = globalRoot.window;
  var document = globalRoot.document;

  /**
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Pie
   */
  var defaultOptions = {
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: 5,
    // Override the class names that are used to generate the SVG structure of the chart
    classNames: {
      chartPie: 'ct-chart-pie',
      chartDonut: 'ct-chart-donut',
      series: 'ct-series',
      slicePie: 'ct-slice-pie',
      sliceDonut: 'ct-slice-donut',
      sliceDonutSolid: 'ct-slice-donut-solid',
      label: 'ct-label'
    },
    // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
    startAngle: 0,
    // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
    total: undefined,
    // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
    donut: false,
    // If specified the donut segments will be drawn as shapes instead of strokes.
    donutSolid: false,
    // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
    // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
    donutWidth: 60,
    // If a label should be shown or not
    showLabel: true,
    // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
    labelOffset: 0,
    // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
    labelPosition: 'inside',
    // An interpolation function for the label value
    labelInterpolationFnc: Chartist.noop,
    // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
    labelDirection: 'neutral',
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If true empty values will be ignored to avoid drawing unncessary slices and labels
    ignoreEmptyValues: false
  };

  /**
   * Determines SVG anchor position based on direction and center parameter
   *
   * @param center
   * @param label
   * @param direction
   * @return {string}
   */
  function determineAnchorPosition(center, label, direction) {
    var toTheRight = label.x > center.x;

    if(toTheRight && direction === 'explode' ||
      !toTheRight && direction === 'implode') {
      return 'start';
    } else if(toTheRight && direction === 'implode' ||
      !toTheRight && direction === 'explode') {
      return 'end';
    } else {
      return 'middle';
    }
  }

  /**
   * Creates the pie chart
   *
   * @param options
   */
  function createChart(options) {
    var data = Chartist.normalizeData(this.data);
    var seriesGroups = [],
      labelsGroup,
      chartRect,
      radius,
      labelRadius,
      totalDataSum,
      startAngle = options.startAngle;

    // Create SVG.js draw
    this.svg = Chartist.createSvg(this.container, options.width, options.height,options.donut ? options.classNames.chartDonut : options.classNames.chartPie);
    // Calculate charting rect
    chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
    // Get biggest circle radius possible within chartRect
    radius = Math.min(chartRect.width() / 2, chartRect.height() / 2);
    // Calculate total of all series to get reference value or use total reference from optional options
    totalDataSum = options.total || data.normalized.series.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    }, 0);

    var donutWidth = Chartist.quantity(options.donutWidth);
    if (donutWidth.unit === '%') {
      donutWidth.value *= radius / 100;
    }

    // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside
    // Unfortunately this is not possible with the current SVG Spec
    // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html
    radius -= options.donut && !options.donutSolid ? donutWidth.value / 2  : 0;

    // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,
    // if regular pie chart it's half of the radius
    if(options.labelPosition === 'outside' || options.donut && !options.donutSolid) {
      labelRadius = radius;
    } else if(options.labelPosition === 'center') {
      // If labelPosition is center we start with 0 and will later wait for the labelOffset
      labelRadius = 0;
    } else if(options.donutSolid) {
      labelRadius = radius - donutWidth.value / 2;
    } else {
      // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie
      // slice
      labelRadius = radius / 2;
    }
    // Add the offset to the labelRadius where a negative offset means closed to the center of the chart
    labelRadius += options.labelOffset;

    // Calculate end angle based on total sum and current data value and offset with padding
    var center = {
      x: chartRect.x1 + chartRect.width() / 2,
      y: chartRect.y2 + chartRect.height() / 2
    };

    // Check if there is only one non-zero value in the series array.
    var hasSingleValInSeries = data.raw.series.filter(function(val) {
      return val.hasOwnProperty('value') ? val.value !== 0 : val !== 0;
    }).length === 1;

    // Creating the series groups
    data.raw.series.forEach(function(series, index) {
      seriesGroups[index] = this.svg.elem('g', null, null);
    }.bind(this));
    //if we need to show labels we create the label group now
    if(options.showLabel) {
      labelsGroup = this.svg.elem('g', null, null);
    }

    // Draw the series
    // initialize series groups
    data.raw.series.forEach(function(series, index) {
      // If current value is zero and we are ignoring empty values then skip to next value
      if (data.normalized.series[index] === 0 && options.ignoreEmptyValues) return;

      // If the series is an object and contains a name or meta data we add a custom attribute
      seriesGroups[index].attr({
        'ct:series-name': series.name
      });

      // Use series class from series data or if not set generate one
      seriesGroups[index].addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(index))
      ].join(' '));

      // If the whole dataset is 0 endAngle should be zero. Can't divide by 0.
      var endAngle = (totalDataSum > 0 ? startAngle + data.normalized.series[index] / totalDataSum * 360 : 0);

      // Use slight offset so there are no transparent hairline issues
      var overlappigStartAngle = Math.max(0, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));

      // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle
      // with Z and use 359.99 degrees
      if(endAngle - overlappigStartAngle >= 359.99) {
        endAngle = overlappigStartAngle + 359.99;
      }

      var start = Chartist.polarToCartesian(center.x, center.y, radius, overlappigStartAngle),
        end = Chartist.polarToCartesian(center.x, center.y, radius, endAngle);

      var innerStart,
        innerEnd,
        donutSolidRadius;

      // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke
      var path = new Chartist.Svg.Path(!options.donut || options.donutSolid)
        .move(end.x, end.y)
        .arc(radius, radius, 0, endAngle - startAngle > 180, 0, start.x, start.y);

      // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie
      if(!options.donut) {
        path.line(center.x, center.y);
      } else if (options.donutSolid) {
        donutSolidRadius = radius - donutWidth.value;
        innerStart = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));
        innerEnd = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, endAngle);
        path.line(innerStart.x, innerStart.y);
        path.arc(donutSolidRadius, donutSolidRadius, 0, endAngle - startAngle  > 180, 1, innerEnd.x, innerEnd.y);
      }

      // Create the SVG path
      // If this is a donut chart we add the donut class, otherwise just a regular slice
      var pathClassName = options.classNames.slicePie;
      if (options.donut) {
        pathClassName = options.classNames.sliceDonut;
        if (options.donutSolid) {
          pathClassName = options.classNames.sliceDonutSolid;
        }
      }
      var pathElement = seriesGroups[index].elem('path', {
        d: path.stringify()
      }, pathClassName);

      // Adding the pie series value to the path
      pathElement.attr({
        'ct:value': data.normalized.series[index],
        'ct:meta': Chartist.serialize(series.meta)
      });

      // If this is a donut, we add the stroke-width as style attribute
      if(options.donut && !options.donutSolid) {
        pathElement._node.style.strokeWidth = donutWidth.value + 'px';
      }

      // Fire off draw event
      this.eventEmitter.emit('draw', {
        type: 'slice',
        value: data.normalized.series[index],
        totalDataSum: totalDataSum,
        index: index,
        meta: series.meta,
        series: series,
        group: seriesGroups[index],
        element: pathElement,
        path: path.clone(),
        center: center,
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle
      });

      // If we need to show labels we need to add the label for this slice now
      if(options.showLabel) {
        var labelPosition;
        if(data.raw.series.length === 1) {
          // If we have only 1 series, we can position the label in the center of the pie
          labelPosition = {
            x: center.x,
            y: center.y
          };
        } else {
          // Position at the labelRadius distance from center and between start and end angle
          labelPosition = Chartist.polarToCartesian(
            center.x,
            center.y,
            labelRadius,
            startAngle + (endAngle - startAngle) / 2
          );
        }

        var rawValue;
        if(data.normalized.labels && !Chartist.isFalseyButZero(data.normalized.labels[index])) {
          rawValue = data.normalized.labels[index];
        } else {
          rawValue = data.normalized.series[index];
        }

        var interpolatedValue = options.labelInterpolationFnc(rawValue, index);

        if(interpolatedValue || interpolatedValue === 0) {
          var labelElement = labelsGroup.elem('text', {
            dx: labelPosition.x,
            dy: labelPosition.y,
            'text-anchor': determineAnchorPosition(center, labelPosition, options.labelDirection)
          }, options.classNames.label).text('' + interpolatedValue);

          // Fire off draw event
          this.eventEmitter.emit('draw', {
            type: 'label',
            index: index,
            group: labelsGroup,
            element: labelElement,
            text: '' + interpolatedValue,
            x: labelPosition.x,
            y: labelPosition.y
          });
        }
      }

      // Set next startAngle to current endAngle.
      // (except for last slice)
      startAngle = endAngle;
    }.bind(this));

    this.eventEmitter.emit('created', {
      chartRect: chartRect,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new pie chart and returns an object that can be used to redraw the chart.
   *
   * @memberof Chartist.Pie
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object with a version and an update method to manually redraw the chart
   *
   * @example
   * // Simple pie chart example with four series
   * new Chartist.Pie('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * });
   *
   * @example
   * // Drawing a donut chart
   * new Chartist.Pie('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * }, {
   *   donut: true
   * });
   *
   * @example
   * // Using donut, startAngle and total to draw a gauge chart
   * new Chartist.Pie('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   donut: true,
   *   donutWidth: 20,
   *   startAngle: 270,
   *   total: 200
   * });
   *
   * @example
   * // Drawing a pie chart with padding and labels that are outside the pie
   * new Chartist.Pie('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   chartPadding: 30,
   *   labelOffset: 50,
   *   labelDirection: 'explode'
   * });
   *
   * @example
   * // Overriding the class names for individual series as well as a name and meta data.
   * // The name will be written as ct:series-name attribute and the meta data will be serialized and written
   * // to a ct:meta attribute.
   * new Chartist.Pie('.ct-chart', {
   *   series: [{
   *     value: 20,
   *     name: 'Series 1',
   *     className: 'my-custom-class-one',
   *     meta: 'Meta One'
   *   }, {
   *     value: 10,
   *     name: 'Series 2',
   *     className: 'my-custom-class-two',
   *     meta: 'Meta Two'
   *   }, {
   *     value: 70,
   *     name: 'Series 3',
   *     className: 'my-custom-class-three',
   *     meta: 'Meta Three'
   *   }]
   * });
   */
  function Pie(query, data, options, responsiveOptions) {
    Chartist.Pie.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating pie chart type in Chartist namespace
  Chartist.Pie = Chartist.Base.extend({
    constructor: Pie,
    createChart: createChart,
    determineAnchorPosition: determineAnchorPosition
  });

}(this, Chartist));

return Chartist;

}));


/***/ }),

/***/ "./node_modules/ngx-pagination/dist/ngx-pagination.js":
/*!************************************************************!*\
  !*** ./node_modules/ngx-pagination/dist/ngx-pagination.js ***!
  \************************************************************/
/*! exports provided: ɵb, ɵa, NgxPaginationModule, PaginationService, PaginationControlsComponent, PaginationControlsDirective, PaginatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return DEFAULT_STYLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return DEFAULT_TEMPLATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxPaginationModule", function() { return NgxPaginationModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationService", function() { return PaginationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationControlsComponent", function() { return PaginationControlsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationControlsDirective", function() { return PaginationControlsDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatePipe", function() { return PaginatePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");



var PaginationService = /** @class */ (function () {
    function PaginationService() {
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.instances = {};
        this.DEFAULT_ID = 'DEFAULT_PAGINATION_ID';
    }
    PaginationService.prototype.defaultId = function () { return this.DEFAULT_ID; };
    /**
     * Register a PaginationInstance with this service. Returns a
     * boolean value signifying whether the instance is new or
     * updated (true = new or updated, false = unchanged).
     */
    PaginationService.prototype.register = function (instance) {
        if (instance.id == null) {
            instance.id = this.DEFAULT_ID;
        }
        if (!this.instances[instance.id]) {
            this.instances[instance.id] = instance;
            return true;
        }
        else {
            return this.updateInstance(instance);
        }
    };
    /**
     * Check each property of the instance and update any that have changed. Return
     * true if any changes were made, else return false.
     */
    PaginationService.prototype.updateInstance = function (instance) {
        var changed = false;
        for (var prop in this.instances[instance.id]) {
            if (instance[prop] !== this.instances[instance.id][prop]) {
                this.instances[instance.id][prop] = instance[prop];
                changed = true;
            }
        }
        return changed;
    };
    /**
     * Returns the current page number.
     */
    PaginationService.prototype.getCurrentPage = function (id) {
        if (this.instances[id]) {
            return this.instances[id].currentPage;
        }
    };
    /**
     * Sets the current page number.
     */
    PaginationService.prototype.setCurrentPage = function (id, page) {
        if (this.instances[id]) {
            var instance = this.instances[id];
            var maxPage = Math.ceil(instance.totalItems / instance.itemsPerPage);
            if (page <= maxPage && 1 <= page) {
                this.instances[id].currentPage = page;
                this.change.emit(id);
            }
        }
    };
    /**
     * Sets the value of instance.totalItems
     */
    PaginationService.prototype.setTotalItems = function (id, totalItems) {
        if (this.instances[id] && 0 <= totalItems) {
            this.instances[id].totalItems = totalItems;
            this.change.emit(id);
        }
    };
    /**
     * Sets the value of instance.itemsPerPage.
     */
    PaginationService.prototype.setItemsPerPage = function (id, itemsPerPage) {
        if (this.instances[id]) {
            this.instances[id].itemsPerPage = itemsPerPage;
            this.change.emit(id);
        }
    };
    /**
     * Returns a clone of the pagination instance object matching the id. If no
     * id specified, returns the instance corresponding to the default id.
     */
    PaginationService.prototype.getInstance = function (id) {
        if (id === void 0) { id = this.DEFAULT_ID; }
        if (this.instances[id]) {
            return this.clone(this.instances[id]);
        }
        return {};
    };
    /**
     * Perform a shallow clone of an object.
     */
    PaginationService.prototype.clone = function (obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    };
    return PaginationService;
}());

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LARGE_NUMBER = Number.MAX_SAFE_INTEGER;
var PaginatePipe = /** @class */ (function () {
    function PaginatePipe(service) {
        this.service = service;
        // store the values from the last time the pipe was invoked
        this.state = {};
    }
    PaginatePipe.prototype.transform = function (collection, args) {
        // When an observable is passed through the AsyncPipe, it will output
        // `null` until the subscription resolves. In this case, we want to
        // use the cached data from the `state` object to prevent the NgFor
        // from flashing empty until the real values arrive.
        if (!(collection instanceof Array)) {
            var _id = args.id || this.service.defaultId();
            if (this.state[_id]) {
                return this.state[_id].slice;
            }
            else {
                return collection;
            }
        }
        var serverSideMode = args.totalItems && args.totalItems !== collection.length;
        var instance = this.createInstance(collection, args);
        var id = instance.id;
        var start, end;
        var perPage = instance.itemsPerPage;
        var emitChange = this.service.register(instance);
        if (!serverSideMode && collection instanceof Array) {
            perPage = +perPage || LARGE_NUMBER;
            start = (instance.currentPage - 1) * perPage;
            end = start + perPage;
            var isIdentical = this.stateIsIdentical(id, collection, start, end);
            if (isIdentical) {
                return this.state[id].slice;
            }
            else {
                var slice = collection.slice(start, end);
                this.saveState(id, collection, slice, start, end);
                this.service.change.emit(id);
                return slice;
            }
        }
        else {
            if (emitChange) {
                this.service.change.emit(id);
            }
            // save the state for server-side collection to avoid null
            // flash as new data loads.
            this.saveState(id, collection, collection, start, end);
            return collection;
        }
    };
    /**
     * Create an PaginationInstance object, using defaults for any optional properties not supplied.
     */
    PaginatePipe.prototype.createInstance = function (collection, config) {
        this.checkConfig(config);
        return {
            id: config.id != null ? config.id : this.service.defaultId(),
            itemsPerPage: +config.itemsPerPage || 0,
            currentPage: +config.currentPage || 1,
            totalItems: +config.totalItems || collection.length
        };
    };
    /**
     * Ensure the argument passed to the filter contains the required properties.
     */
    PaginatePipe.prototype.checkConfig = function (config) {
        var required = ['itemsPerPage', 'currentPage'];
        var missing = required.filter(function (prop) { return !(prop in config); });
        if (0 < missing.length) {
            throw new Error("PaginatePipe: Argument is missing the following required properties: " + missing.join(', '));
        }
    };
    /**
     * To avoid returning a brand new array each time the pipe is run, we store the state of the sliced
     * array for a given id. This means that the next time the pipe is run on this collection & id, we just
     * need to check that the collection, start and end points are all identical, and if so, return the
     * last sliced array.
     */
    PaginatePipe.prototype.saveState = function (id, collection, slice, start, end) {
        this.state[id] = {
            collection: collection,
            size: collection.length,
            slice: slice,
            start: start,
            end: end
        };
    };
    /**
     * For a given id, returns true if the collection, size, start and end values are identical.
     */
    PaginatePipe.prototype.stateIsIdentical = function (id, collection, start, end) {
        var state = this.state[id];
        if (!state) {
            return false;
        }
        var isMetaDataIdentical = state.size === collection.length &&
            state.start === start &&
            state.end === end;
        if (!isMetaDataIdentical) {
            return false;
        }
        return state.slice.every(function (element, index) { return element === collection[start + index]; });
    };
    PaginatePipe = __decorate$1([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'paginate',
            pure: false
        }),
        __metadata("design:paramtypes", [PaginationService])
    ], PaginatePipe);
    return PaginatePipe;
}());

/**
 * The default template and styles for the pagination links are borrowed directly
 * from Zurb Foundation 6: http://foundation.zurb.com/sites/docs/pagination.html
 */
var DEFAULT_TEMPLATE = "\n    <pagination-template  #p=\"paginationApi\"\n                         [id]=\"id\"\n                         [maxSize]=\"maxSize\"\n                         (pageChange)=\"pageChange.emit($event)\"\n                         (pageBoundsCorrection)=\"pageBoundsCorrection.emit($event)\">\n    <ul class=\"ngx-pagination\" \n        role=\"navigation\" \n        [attr.aria-label]=\"screenReaderPaginationLabel\" \n        [class.responsive]=\"responsive\"\n        *ngIf=\"!(autoHide && p.pages.length <= 1)\">\n\n        <li class=\"pagination-previous\" [class.disabled]=\"p.isFirstPage()\" *ngIf=\"directionLinks\"> \n            <a tabindex=\"0\" *ngIf=\"1 < p.getCurrent()\" (keyup.enter)=\"p.previous()\" (click)=\"p.previous()\" [attr.aria-label]=\"previousLabel + ' ' + screenReaderPageLabel\">\n                {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </a>\n            <span *ngIf=\"p.isFirstPage()\">\n                {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </span>\n        </li> \n\n        <li class=\"small-screen\">\n            {{ p.getCurrent() }} / {{ p.getLastPage() }}\n        </li>\n\n        <li [class.current]=\"p.getCurrent() === page.value\" \n            [class.ellipsis]=\"page.label === '...'\"\n            *ngFor=\"let page of p.pages\">\n            <a tabindex=\"0\" (keyup.enter)=\"p.setCurrent(page.value)\" (click)=\"p.setCurrent(page.value)\" *ngIf=\"p.getCurrent() !== page.value\">\n                <span class=\"show-for-sr\">{{ screenReaderPageLabel }} </span>\n                <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span>\n            </a>\n            <ng-container *ngIf=\"p.getCurrent() === page.value\">\n                <span class=\"show-for-sr\">{{ screenReaderCurrentLabel }} </span>\n                <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span> \n            </ng-container>\n        </li>\n\n        <li class=\"pagination-next\" [class.disabled]=\"p.isLastPage()\" *ngIf=\"directionLinks\">\n            <a tabindex=\"0\" *ngIf=\"!p.isLastPage()\" (keyup.enter)=\"p.next()\" (click)=\"p.next()\" [attr.aria-label]=\"nextLabel + ' ' + screenReaderPageLabel\">\n                 {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </a>\n            <span *ngIf=\"p.isLastPage()\">\n                 {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </span>\n        </li>\n\n    </ul>\n    </pagination-template>\n    ";
var DEFAULT_STYLES = "\n.ngx-pagination {\n  margin-left: 0;\n  margin-bottom: 1rem; }\n  .ngx-pagination::before, .ngx-pagination::after {\n    content: ' ';\n    display: table; }\n  .ngx-pagination::after {\n    clear: both; }\n  .ngx-pagination li {\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    margin-right: 0.0625rem;\n    border-radius: 0; }\n  .ngx-pagination li {\n    display: inline-block; }\n  .ngx-pagination a,\n  .ngx-pagination button {\n    color: #0a0a0a; \n    display: block;\n    padding: 0.1875rem 0.625rem;\n    border-radius: 0; }\n    .ngx-pagination a:hover,\n    .ngx-pagination button:hover {\n      background: #e6e6e6; }\n  .ngx-pagination .current {\n    padding: 0.1875rem 0.625rem;\n    background: #2199e8;\n    color: #fefefe;\n    cursor: default; }\n  .ngx-pagination .disabled {\n    padding: 0.1875rem 0.625rem;\n    color: #cacaca;\n    cursor: default; } \n    .ngx-pagination .disabled:hover {\n      background: transparent; }\n  .ngx-pagination a, .ngx-pagination button {\n    cursor: pointer; }\n\n.ngx-pagination .pagination-previous a::before,\n.ngx-pagination .pagination-previous.disabled::before { \n  content: '\u00AB';\n  display: inline-block;\n  margin-right: 0.5rem; }\n\n.ngx-pagination .pagination-next a::after,\n.ngx-pagination .pagination-next.disabled::after {\n  content: '\u00BB';\n  display: inline-block;\n  margin-left: 0.5rem; }\n\n.ngx-pagination .show-for-sr {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0); }\n.ngx-pagination .small-screen {\n  display: none; }\n@media screen and (max-width: 601px) {\n  .ngx-pagination.responsive .small-screen {\n    display: inline-block; } \n  .ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next) {\n    display: none; }\n}\n  ";

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function coerceToBoolean(input) {
    return !!input && input !== 'false';
}
/**
 * The default pagination controls component. Actually just a default implementation of a custom template.
 */
var PaginationControlsComponent = /** @class */ (function () {
    function PaginationControlsComponent() {
        this.maxSize = 7;
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.screenReaderPaginationLabel = 'Pagination';
        this.screenReaderPageLabel = 'page';
        this.screenReaderCurrentLabel = "You're on page";
        this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageBoundsCorrection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._directionLinks = true;
        this._autoHide = false;
        this._responsive = false;
    }
    Object.defineProperty(PaginationControlsComponent.prototype, "directionLinks", {
        get: function () {
            return this._directionLinks;
        },
        set: function (value) {
            this._directionLinks = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsComponent.prototype, "autoHide", {
        get: function () {
            return this._autoHide;
        },
        set: function (value) {
            this._autoHide = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsComponent.prototype, "responsive", {
        get: function () {
            return this._responsive;
        },
        set: function (value) {
            this._responsive = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "id", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Number)
    ], PaginationControlsComponent.prototype, "maxSize", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Boolean),
        __metadata$1("design:paramtypes", [Boolean])
    ], PaginationControlsComponent.prototype, "directionLinks", null);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Boolean),
        __metadata$1("design:paramtypes", [Boolean])
    ], PaginationControlsComponent.prototype, "autoHide", null);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", Boolean),
        __metadata$1("design:paramtypes", [Boolean])
    ], PaginationControlsComponent.prototype, "responsive", null);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "previousLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "nextLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "screenReaderPaginationLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "screenReaderPageLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$1("design:type", String)
    ], PaginationControlsComponent.prototype, "screenReaderCurrentLabel", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$1("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsComponent.prototype, "pageChange", void 0);
    __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$1("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsComponent.prototype, "pageBoundsCorrection", void 0);
    PaginationControlsComponent = __decorate$2([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pagination-controls',
            template: DEFAULT_TEMPLATE,
            styles: [DEFAULT_STYLES],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        })
    ], PaginationControlsComponent);
    return PaginationControlsComponent;
}());

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * This directive is what powers all pagination controls components, including the default one.
 * It exposes an API which is hooked up to the PaginationService to keep the PaginatePipe in sync
 * with the pagination controls.
 */
var PaginationControlsDirective = /** @class */ (function () {
    function PaginationControlsDirective(service, changeDetectorRef) {
        var _this = this;
        this.service = service;
        this.changeDetectorRef = changeDetectorRef;
        this.maxSize = 7;
        this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageBoundsCorrection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pages = [];
        this.changeSub = this.service.change
            .subscribe(function (id) {
            if (_this.id === id) {
                _this.updatePageLinks();
                _this.changeDetectorRef.markForCheck();
                _this.changeDetectorRef.detectChanges();
            }
        });
    }
    PaginationControlsDirective.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            this.id = this.service.defaultId();
        }
        this.updatePageLinks();
    };
    PaginationControlsDirective.prototype.ngOnChanges = function (changes) {
        this.updatePageLinks();
    };
    PaginationControlsDirective.prototype.ngOnDestroy = function () {
        this.changeSub.unsubscribe();
    };
    /**
     * Go to the previous page
     */
    PaginationControlsDirective.prototype.previous = function () {
        this.checkValidId();
        this.setCurrent(this.getCurrent() - 1);
    };
    /**
     * Go to the next page
     */
    PaginationControlsDirective.prototype.next = function () {
        this.checkValidId();
        this.setCurrent(this.getCurrent() + 1);
    };
    /**
     * Returns true if current page is first page
     */
    PaginationControlsDirective.prototype.isFirstPage = function () {
        return this.getCurrent() === 1;
    };
    /**
     * Returns true if current page is last page
     */
    PaginationControlsDirective.prototype.isLastPage = function () {
        return this.getLastPage() === this.getCurrent();
    };
    /**
     * Set the current page number.
     */
    PaginationControlsDirective.prototype.setCurrent = function (page) {
        this.pageChange.emit(page);
    };
    /**
     * Get the current page number.
     */
    PaginationControlsDirective.prototype.getCurrent = function () {
        return this.service.getCurrentPage(this.id);
    };
    /**
     * Returns the last page number
     */
    PaginationControlsDirective.prototype.getLastPage = function () {
        var inst = this.service.getInstance(this.id);
        if (inst.totalItems < 1) {
            // when there are 0 or fewer (an error case) items, there are no "pages" as such,
            // but it makes sense to consider a single, empty page as the last page.
            return 1;
        }
        return Math.ceil(inst.totalItems / inst.itemsPerPage);
    };
    PaginationControlsDirective.prototype.getTotalItems = function () {
        return this.service.getInstance(this.id).totalItems;
    };
    PaginationControlsDirective.prototype.checkValidId = function () {
        if (this.service.getInstance(this.id).id == null) {
            console.warn("PaginationControlsDirective: the specified id \"" + this.id + "\" does not match any registered PaginationInstance");
        }
    };
    /**
     * Updates the page links and checks that the current page is valid. Should run whenever the
     * PaginationService.change stream emits a value matching the current ID, or when any of the
     * input values changes.
     */
    PaginationControlsDirective.prototype.updatePageLinks = function () {
        var _this = this;
        var inst = this.service.getInstance(this.id);
        var correctedCurrentPage = this.outOfBoundCorrection(inst);
        if (correctedCurrentPage !== inst.currentPage) {
            setTimeout(function () {
                _this.pageBoundsCorrection.emit(correctedCurrentPage);
                _this.pages = _this.createPageArray(inst.currentPage, inst.itemsPerPage, inst.totalItems, _this.maxSize);
            });
        }
        else {
            this.pages = this.createPageArray(inst.currentPage, inst.itemsPerPage, inst.totalItems, this.maxSize);
        }
    };
    /**
     * Checks that the instance.currentPage property is within bounds for the current page range.
     * If not, return a correct value for currentPage, or the current value if OK.
     */
    PaginationControlsDirective.prototype.outOfBoundCorrection = function (instance) {
        var totalPages = Math.ceil(instance.totalItems / instance.itemsPerPage);
        if (totalPages < instance.currentPage && 0 < totalPages) {
            return totalPages;
        }
        else if (instance.currentPage < 1) {
            return 1;
        }
        return instance.currentPage;
    };
    /**
     * Returns an array of Page objects to use in the pagination controls.
     */
    PaginationControlsDirective.prototype.createPageArray = function (currentPage, itemsPerPage, totalItems, paginationRange) {
        // paginationRange could be a string if passed from attribute, so cast to number.
        paginationRange = +paginationRange;
        var pages = [];
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        var halfWay = Math.ceil(paginationRange / 2);
        var isStart = currentPage <= halfWay;
        var isEnd = totalPages - halfWay < currentPage;
        var isMiddle = !isStart && !isEnd;
        var ellipsesNeeded = paginationRange < totalPages;
        var i = 1;
        while (i <= totalPages && i <= paginationRange) {
            var label = void 0;
            var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
            var openingEllipsesNeeded = (i === 2 && (isMiddle || isEnd));
            var closingEllipsesNeeded = (i === paginationRange - 1 && (isMiddle || isStart));
            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                label = '...';
            }
            else {
                label = pageNumber;
            }
            pages.push({
                label: label,
                value: pageNumber
            });
            i++;
        }
        return pages;
    };
    /**
     * Given the position in the sequence of pagination links [i],
     * figure out what page number corresponds to that position.
     */
    PaginationControlsDirective.prototype.calculatePageNumber = function (i, currentPage, paginationRange, totalPages) {
        var halfWay = Math.ceil(paginationRange / 2);
        if (i === paginationRange) {
            return totalPages;
        }
        else if (i === 1) {
            return i;
        }
        else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            }
            else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            }
            else {
                return i;
            }
        }
        else {
            return i;
        }
    };
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$2("design:type", String)
    ], PaginationControlsDirective.prototype, "id", void 0);
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata$2("design:type", Number)
    ], PaginationControlsDirective.prototype, "maxSize", void 0);
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$2("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsDirective.prototype, "pageChange", void 0);
    __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata$2("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginationControlsDirective.prototype, "pageBoundsCorrection", void 0);
    PaginationControlsDirective = __decorate$3([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: 'pagination-template,[pagination-template]',
            exportAs: 'paginationApi'
        }),
        __metadata$2("design:paramtypes", [PaginationService,
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], PaginationControlsDirective);
    return PaginationControlsDirective;
}());

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NgxPaginationModule = /** @class */ (function () {
    function NgxPaginationModule() {
    }
    NgxPaginationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            declarations: [
                PaginatePipe,
                PaginationControlsComponent,
                PaginationControlsDirective
            ],
            providers: [PaginationService],
            exports: [PaginatePipe, PaginationControlsComponent, PaginationControlsDirective]
        })
    ], NgxPaginationModule);
    return NgxPaginationModule;
}());

/**
 * Generated bundle index. Do not edit.
 */




/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/add-farm/add-farm.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/add-farm/add-farm.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"container-fluid\">\n    <button type=\"button\" class=\"btn btn-info btn-lg float-right\" data-toggle=\"modal\" data-target=\"#addFarm\">Add New\n      Farm</button>\n    <!-- Modal -->\n    <div id=\"addFarm\" class=\"modal fade\" role=\"dialog\">\n      <div class=\"modal-dialog\">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            <h4 class=\"modal-title\">Add Farm </h4>\n          </div>\n          <div class=\"modal-body\">\n            <mat-card>\n              <form (submit)=\"postFarm(addFarm)\" #addFarm=\"ngForm\">\n                <div class=\"form-row\">\n                  <div class=\"col-md-6 mb-6\">\n                    <label for=\"farmOwner\">Select Farm Owner</label>\n                    <select id=\"farmOwner\" class=\"form-control is-valid\" multiple ngModel name=\"farmOwner\"\n                      #farmOwner=\"ngModel\" required>\n                      <option ng-value=\"\" selected>Choose Owner</option>\n                      <option *ngFor=\"let owner of farmOwnerData.posts\" [ngValue]=\"owner\">{{owner?.firstName}}\n                        {{owner?.lastName}}</option>\n                    </select>\n                    <!-- <ng-select bindLabel=\"name\" class=\"form-control is-valid\" placeholder=\"\"\n                     appendTo=\"body\" multiple=\"true\"\n                       [clearable]=\"true\"\n                       ngModel name=\"farmOwner\" #farmOwner=\"ngModel\">\n                      <ng-option [value]=\"owner\" \n                       *ngFor=\"let owner of postsOwner\">\n                        {{owner.firstName}}  {{owner.lastName}}\n                      </ng-option>\n                    </ng-select> -->\n                    <span *ngIf=\"farmOwner.invalid\">Choose farmOwner.</span>\n\n                  </div>\n                  <div class=\"col-md-6 mb-6\">\n                    <label for=\"farmHistory\">Farm History</label>\n                    <input type=\"text\" class=\"form-control is-valid\" ngModel name=\"farmHistory\" id=\"farmHistory\"\n                      #farmHistory=\"ngModel\" placeholder=\"Enter Farm History\" required>\n                    <span *ngIf=\"farmHistory.invalid\">Enter farm History.</span>\n\n                  </div>\n                </div>\n                <div class=\"form-row\">\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"village\">Village</label>\n                    <input type=\"text\" class=\"form-control is-valid\" ngModel name=\"village\" id=\"village\"\n                      #village=\"ngModel\" placeholder=\"Enter village\" required>\n                    <span *ngIf=\"village.invalid\">Enter Village.</span>\n\n                  </div>\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"mandal\">Mandal</label>\n                    <input type=\"text\" class=\"form-control is-valid\" name=\"mandal\" id=\"mandal\" ngModel #mandal=\"ngModel\"\n                      placeholder=\"Enter Mandal\" required>\n                    <span *ngIf=\"mandal.invalid\">Enter Mandal.</span>\n\n                  </div>\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"city\">City</label>\n                    <input type=\"text\" class=\"form-control is-valid\" name=\"city\" id=\"city\" ngModel #city=\"ngModel\"\n                      placeholder=\"Enter city\" required>\n                    <span *ngIf=\"city.invalid\">Enter city.</span>\n\n                  </div>\n                </div>\n                <div class=\"form-row\">\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"state\">State</label>\n                    <input type=\"text\" class=\"form-control is-valid\" name=\"state\" id=\"state\" ngModel #state=\"ngModel\"\n                      placeholder=\"Enter State\" required>\n                    <span *ngIf=\"state.invalid\">Enter state.</span>\n\n                  </div>\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"zip\">ZIP</label>\n                    <input type=\"text\" class=\"form-control is-valid\" name=\"zip\" id=\"zip\" ngModel #zip=\"ngModel\"\n                      placeholder=\"Enter Zip\" required>\n                    <span *ngIf=\"zip.invalid\">Enter Zip.</span>\n\n                  </div>\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"country \">Country</label>\n                    <input type=\"text\" class=\"form-control is-valid\" name=\"country\" id=\"country\" ngModel\n                      #country=\"ngModel\" placeholder=\"Enter Country\" required>\n                    <span *ngIf=\"country.invalid\">Enter Country.</span>\n\n                  </div>\n                </div>\n                <div class=\"form-row\">\n\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"noOfTanks\">No of Tanks</label>\n                    <input type=\"number\" class=\"form-control is-valid\" \n                      name=\"noOfTanks\" id=\"noOfTanks\" ngModel #noOfTanks=\"ngModel\" (ngModelChange)=\"dataChanged(noOfTanks)\"\n                       placeholder=\"Enter No of Tanks\"\n                      required min=\"0\" max=\"12\">\n                    <span *ngIf=\"noOfTanks.invalid\">Enter No of Tanks.</span>\n\n                  </div>\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"noOfEmployess\">No Of Employees</label>\n                    <input type=\"number\" class=\"form-control is-valid\" id=\"noOfEmployess\" name=\"noOfEmployess\" ngModel\n                      #noOfEmployess=\"ngModel\" placeholder=\"Enter No Of Employess\" required min=\"0\">\n                    <span *ngIf=\"noOfEmployess.invalid\">Enter no of Emp.</span>\n                  </div>\n                  <div class=\"col-md-4 mb-3\">\n                    <label for=\"tankCode\">Tank Code</label>\n                    <input type=\"text\" class=\"form-control is-valid\" id=\"tankCode\" name=\"tankCode\" ngModel\n                      #tankCode=\"ngModel\" placeholder=\"Enter Code\" required maxlength=\"6\">\n                    <span *ngIf=\"noOfEmployess.invalid\">Enter Code.</span>\n                  </div>\n                </div>\n                <div class=\"form-row\">\n                  <div class=\"col-md-8 mb-3\">\n                    <label for=\"tankArea\">Water Area of Tank</label>\n                    <!-- <tr *ngFor=\"let field of waterAreaOfTank; let i = index\">\n                      <td>\n                        <label for=\"tankArea\">{{tankCode}}\n                          <input type=\"number\" class=\"form-control is-valid\" \n                          [(ngModel)]=\"field.tankArea\" name=\"field.tankArea\" id=\"tankArea\"\n                           placeholder=\"Enter area\" required min=\"0\">\n                        </label>\n                      </td>\n                    </tr> -->\n                    <tbody >\n                      <tr>\n                        <th>Tank Code</th>\n                        <th>Tank Area</th>\n                      </tr>\n                      <tr *ngFor=\"let field of fieldArray; let i = index\">\n                        <!-- <td>{{tankCode.value}}</td> -->\n                        <td>\n                          <input type=\"text\" class=\"form-control\" \n                          [(ngModel)]=\"field.tank_name\" name=\"field.tank_name\" \n                           id=\"tank_name\" value=\"{{tankCode.value}}\" >\n                      </td>\n                        <td>\n                          <input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.tank_area\"  name=\"field.tank_area\"\n                            placeholder=\"Enter Tank Area \" id=\"tank_area\">\n                        </td>\n                      <!-- </td> -->\n                      </tr>\n                    </tbody>\n                  </div>\n                </div>\n                <!-- <button class=\"btn btn-primary\" type=\"reset\" (click)=\"resetFarm\">Reset</button> -->\n\n                <button class=\"btn btn-primary\" type=\"submit\" id=\"closeModal\" [disabled]=\"!addFarm.valid\">Register\n                  Farm</button>\n              </form>\n            </mat-card>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n\n      </div>\n    </div>\n    <mat-spinner *ngIf=\"isLoading\"></mat-spinner>\n    <div *ngIf=\"!isLoading\" class=\"table-responsive\">\n      <table class=\"table\">\n        <thead class=\"thead-dark\">\n          <tr>\n            <th scope=\"col\">#</th>\n            <th scope=\"col\">Farm Owner</th>\n            <th scope=\"col\">Farm History</th>\n            <th scope=\"col\">Village</th>\n            <th scope=\"col\">Mandal</th>\n            <th scope=\"col\">City</th>\n            <th scope=\"col\">State</th>\n            <th scope=\"col\">ZIP</th>\n            <th scope=\"col\">Country</th>\n            <th scope=\"col\">No Of Tanks</th>\n            <th scope=\"col\">No Of Emp</th>\n            <th scope=\"col\">Delete</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let getFarm of farmData.posts | paginate: { itemsPerPage: 10, currentPage: p };let i = index;\">\n            <th scope=\"row\">{{i +1}}</th>\n            <td>\n              <div *ngFor=\"let fo of farmData.posts[i].farmOwner;let j = index\">\n                <span *ngIf=\"fo.firstName\">\n                  {{j+1}}. {{fo?.firstName}} {{fo?.lastName}}\n                </span>\n              </div>\n              <span *ngIf=\"getFarm.farmOwner?.firstName\">\n                {{getFarm.farmOwner?.firstName}} {{getFarm.farmOwner?.lastName}}\n              </span>\n            </td>\n            <td>{{getFarm.farmHistory}}</td>\n            <td>{{getFarm.village}}</td>\n            <td>{{getFarm.mandal}}</td>\n            <td>{{getFarm.city}}</td>\n            <td>{{getFarm.state}}</td>\n            <td>{{getFarm.zip}}</td>\n            <td>{{getFarm.country}}</td>\n            <td>{{getFarm.noOfTanks}}</td>\n            <td>{{getFarm.noOfEmployess}}</td>\n            <td>\n              <button mat-button color=\"warn\" (click)=\"onDelete(getFarm._id)\">DELETE</button>\n\n            </td> \n          </tr>\n        </tbody>\n      </table>\n      <!-- <mat-paginator [length]=\"totalPosts\" [pageSize]=\"postsPerPage\" [pageSizeOptions]=\"pageSizeOptions\"\n        (page)=onChangePage($event)></mat-paginator> -->\n      <div class=\"pagination-controls\">\n        <pagination-controls (pageChange)=\"p = $event\"></pagination-controls>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/customers-data/customers-data.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/customers-data/customers-data.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"table-responsive\">\r\n      <table class=\"table\">\r\n        <thead class=\"thead-dark\">\r\n          <tr>\r\n            <th scope=\"col\">Name</th>\r\n            <th scope=\"col\">Email</th>\r\n            <th scope=\"col\">DOB</th>\r\n            <th scope=\"col\">Add</th>\r\n\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let x of customerData?.posts\">\r\n            <td>{{x.name}}</td>\r\n            <td>{{x.email}}</td>\r\n            <td>{{x.birthdate}}</td>\r\n            <td>{{x.address}}</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <div class=\"pagination-controls\">\r\n        <pagination-controls (pageChange)=\"p = $event\"></pagination-controls>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/dashboard/dashboard.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/dashboard/dashboard.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"container-fluid\">\n      <div class=\"row\">\n          <div class=\"col-lg-3 col-md-6 col-sm-6\">\n              <div class=\"card card-stats\">\n                  <div class=\"card-header card-header-warning card-header-icon\">\n                      <div class=\"card-icon\">\n                          <i class=\"material-icons\">content_copy</i>\n                      </div>\n                      <p class=\"card-category\">Used Space</p>\n                      <h3 class=\"card-title\">49/50\n                          <small>GB</small>\n                      </h3>\n                  </div>\n                  <div class=\"card-footer\">\n                      <div class=\"stats\">\n                          <i class=\"material-icons text-danger\">warning</i>\n                          <a href=\"javascript:void(0)\">Get More Space...</a>\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6\">\n              <div class=\"card card-stats\">\n                  <div class=\"card-header card-header-success card-header-icon\">\n                      <div class=\"card-icon\">\n                          <i class=\"material-icons\">store</i>\n                      </div>\n                      <p class=\"card-category\">Revenue</p>\n                      <h3 class=\"card-title\">$34,245</h3>\n                  </div>\n                  <div class=\"card-footer\">\n                      <div class=\"stats\">\n                          <i class=\"material-icons\">date_range</i> Last 24 Hours\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6\">\n              <div class=\"card card-stats\">\n                  <div class=\"card-header card-header-danger card-header-icon\">\n                      <div class=\"card-icon\">\n                          <i class=\"material-icons\">info_outline</i>\n                      </div>\n                      <p class=\"card-category\">Fixed Issues</p>\n                      <h3 class=\"card-title\">75</h3>\n                  </div>\n                  <div class=\"card-footer\">\n                      <div class=\"stats\">\n                          <i class=\"material-icons\">local_offer</i> Tracked from Github\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"col-lg-3 col-md-6 col-sm-6\">\n              <div class=\"card card-stats\">\n                  <div class=\"card-header card-header-info card-header-icon\">\n                      <div class=\"card-icon\">\n                          <i class=\"fa fa-twitter\"></i>\n                      </div>\n                      <p class=\"card-category\">Followers</p>\n                      <h3 class=\"card-title\">+245</h3>\n                  </div>\n                  <div class=\"card-footer\">\n                      <div class=\"stats\">\n                          <i class=\"material-icons\">update</i> Just Updated\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n      <div class=\"row\">\n          <div class=\"col-md-4\">\n              <div class=\"card card-chart\">\n                  <div class=\"card-header card-header-success\">\n                      <div class=\"ct-chart\" id=\"dailySalesChart\"></div>\n                  </div>\n                  <div class=\"card-body\">\n                      <h4 class=\"card-title\">Daily Sales</h4>\n                      <p class=\"card-category\">\n                          <span class=\"text-success\"><i class=\"fa fa-long-arrow-up\"></i> 55% </span> increase in today sales.</p>\n                  </div>\n                  <div class=\"card-footer\">\n                      <div class=\"stats\">\n                          <i class=\"material-icons\">access_time</i> updated 4 minutes ago\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"col-md-4\">\n              <div class=\"card card-chart\">\n                  <div class=\"card-header card-header-warning\">\n                      <div class=\"ct-chart\" id=\"websiteViewsChart\"></div>\n                  </div>\n                  <div class=\"card-body\">\n                      <h4 class=\"card-title\">Email Subscriptions</h4>\n                      <p class=\"card-category\">Last Campaign Performance</p>\n                  </div>\n                  <div class=\"card-footer\">\n                      <div class=\"stats\">\n                          <i class=\"material-icons\">access_time</i> campaign sent 2 days ago\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"col-md-4\">\n              <div class=\"card card-chart\">\n                  <div class=\"card-header card-header-danger\">\n                      <div class=\"ct-chart\" id=\"completedTasksChart\"></div>\n                  </div>\n                  <div class=\"card-body\">\n                      <h4 class=\"card-title\">Completed Tasks</h4>\n                      <p class=\"card-category\">Last Campaign Performance</p>\n                  </div>\n                  <div class=\"card-footer\">\n                      <div class=\"stats\">\n                          <i class=\"material-icons\">access_time</i> campaign sent 2 days ago\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n      <div class=\"row\">\n          <div class=\"col-lg-6 col-md-12\">\n              <div class=\"card\">\n                  <div class=\"card-header card-header-tabs card-header-primary\">\n                      <div class=\"nav-tabs-navigation\">\n                          <div class=\"nav-tabs-wrapper\">\n                              <span class=\"nav-tabs-title\">Tasks:</span>\n                              <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\n                                  <li class=\"nav-item\">\n                                      <a mat-button class=\"nav-link active\" href=\"#profile\" data-toggle=\"tab\">\n                                          <i class=\"material-icons\">bug_report</i> Bugs\n                                          <div class=\"ripple-container\"></div>\n                                      </a>\n                                  </li>\n                                  <li class=\"nav-item\">\n                                      <a mat-button class=\"nav-link\" href=\"#messages\" data-toggle=\"tab\">\n                                          <i class=\"material-icons\">code</i> Website\n                                          <div class=\"ripple-container\"></div>\n                                      </a>\n                                  </li>\n                                  <li class=\"nav-item\">\n                                      <a mat-button class=\"nav-link\" href=\"#settings\" data-toggle=\"tab\">\n                                          <i class=\"material-icons\">cloud</i> Server\n                                          <div class=\"ripple-container\"></div>\n                                      </a>\n                                  </li>\n                              </ul>\n                          </div>\n                      </div>\n                  </div>\n                  <div class=\"card-body\">\n                      <div class=\"tab-content\">\n                          <div class=\"tab-pane active\" id=\"profile\">\n                              <table class=\"table\">\n                                  <tbody>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\" checked>\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Sign contract for \"What are conference organizers afraid of?\"</td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\">\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\">\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit\n                                          </td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\" checked>\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Create 4 Invisible User Experiences you Never Knew About</td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                  </tbody>\n                              </table>\n                          </div>\n                          <div class=\"tab-pane\" id=\"messages\">\n                              <table class=\"table\">\n                                  <tbody>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\" checked>\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit\n                                          </td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\">\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Sign contract for \"What are conference organizers afraid of?\"</td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                  </tbody>\n                              </table>\n                          </div>\n                          <div class=\"tab-pane\" id=\"settings\">\n                              <table class=\"table\">\n                                  <tbody>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\">\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\" checked>\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit\n                                          </td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                      <tr>\n                                          <td>\n                                              <div class=\"form-check\">\n                                                  <label class=\"form-check-label\">\n                                                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\" checked>\n                                                      <span class=\"form-check-sign\">\n                                                          <span class=\"check\"></span>\n                                                      </span>\n                                                  </label>\n                                              </div>\n                                          </td>\n                                          <td>Sign contract for \"What are conference organizers afraid of?\"</td>\n                                          <td class=\"td-actions text-right\">\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Edit Task\" [matTooltipPosition]=\"'above'\" class=\"btn btn-primary btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">edit</i>\n                                              </button>\n                                              <button mat-raised-button type=\"button\" matTooltip=\"Remove\" [matTooltipPosition]=\"'above'\" class=\"btn btn-danger btn-link btn-sm btn-just-icon\">\n                                                  <i class=\"material-icons\">close</i>\n                                              </button>\n                                          </td>\n                                      </tr>\n                                  </tbody>\n                              </table>\n                          </div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12\">\n              <div class=\"card\">\n                  <div class=\"card-header card-header-warning\">\n                      <h4 class=\"card-title\">Employees Stats</h4>\n                      <p class=\"card-category\">New employees on 15th September, 2016</p>\n                  </div>\n                  <div class=\"card-body table-responsive\">\n                      <table class=\"table table-hover\">\n                          <thead class=\"text-warning\">\n                              <th>ID</th>\n                              <th>Name</th>\n                              <th>Salary</th>\n                              <th>Country</th>\n                          </thead>\n                          <tbody>\n                              <tr>\n                                  <td>1</td>\n                                  <td>Dakota Rice</td>\n                                  <td>$36,738</td>\n                                  <td>Niger</td>\n                              </tr>\n                              <tr>\n                                  <td>2</td>\n                                  <td>Minerva Hooper</td>\n                                  <td>$23,789</td>\n                                  <td>Curaçao</td>\n                              </tr>\n                              <tr>\n                                  <td>3</td>\n                                  <td>Sage Rodriguez</td>\n                                  <td>$56,142</td>\n                                  <td>Netherlands</td>\n                              </tr>\n                              <tr>\n                                  <td>4</td>\n                                  <td>Philip Chaney</td>\n                                  <td>$38,735</td>\n                                  <td>Korea, South</td>\n                              </tr>\n                          </tbody>\n                      </table>\n                  </div>\n              </div>\n          </div>\n      </div>\n  </div>\n</div>\n<div class=\"main-content\">\n    <div class=\"container-fluid\">\n    <span>No data</span>        \n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<hr>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n    <button type=\"button\" id=\"count\" class=\"btn btn-info\" (click)=\"loadCount();\" value=\"Count\">Count</button>\n  </div>\n  <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n    <button type=\"button\" id=\"harvest\" class=\"btn btn-info\" (click)=\"loadHarvest();\">Harvest</button>\n  </div>\n</div>\n<div class=\"row\" *ngIf=\"harvestFormData\">\n  <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n    <button type=\"button\" id=\"halfHarvest\" class=\"btn btn-info\" (click)=\"halfHarvest();\">\n      Half Harvest</button>\n  </div>\n  <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n    <button type=\"button\" id=\"fullHarvest\" class=\"btn btn-info\" (click)=\"fullHarvest();\">\n      Full Harvest</button>\n  </div>\n</div>\n<hr>\n<div class=\"card-deck row\" *ngIf=\"countFormData\">\n  <form [formGroup]=\"countForm\" (ngSubmit)=\"onSubmitcountForm()\">\n    <div formArrayName=\"TankInput\">\n      <table class=\"table table-responsive\">\n        <th>\n          <tbody>\n            <tr><input type=\"text\" value=\"Tank Name\" readonly></tr>\n            <tr><input type=\"text\" value=\"Count\" readonly></tr>\n            <tr><input type=\"text\" value=\"Count/Grams \" readonly></tr>\n            <tr><input type=\"text\" value=\"Kg's / net\" readonly></tr>\n            <tr><input type=\"text\" value=\"Roopchand Count\" readonly></tr>\n            <tr><input type=\"text\" value=\"Neeting Side\" readonly></tr>\n            <tr><input type=\"text\" value=\"1st Feed Time\" readonly></tr>\n            <tr><input type=\"text\" value=\"Neeting Time\" readonly></tr>\n          </tbody>\n        </th>\n        <th *ngFor=\"let TankInput of countForm.get('TankInput')['controls'];\n  let i=index\">\n          <tbody [formGroupName]=\"i\">\n            <!-- <tr> {{i+1}}</tr> -->\n            <tr> <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"count\"></tr>\n            <tr> <input type=\"text\" formControlName=\"count_gms\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kg_net\"></tr>\n            <tr> <input type=\"text\" formControlName=\"roopchand_count\"></tr>\n            <tr> <input type=\"text\" formControlName=\"neeting_side\"></tr>\n            <tr> <input type=\"text\" formControlName=\"first_feed_time\"></tr>\n            <tr> <input type=\"text\" formControlName=\"neeting_time\"></tr>\n          </tbody>\n        </th>\n      </table>\n    </div>\n\n    <h1 class=\"text-center\">Count Observation</h1>\n    <div formArrayName=\"CountObservations\">\n      <table class=\"table table-responsive\">\n        <th>\n          <tbody>\n            <tr><input type=\"text\" value=\"Tank Name\" readonly></tr>\n            <tr><input type=\"text\" value=\"No body Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Head Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No new shell formation\" readonly></tr>\n            <tr><input type=\"text\" value=\"Meesum cut Black\" readonly></tr>\n            <tr><input type=\"text\" value=\"Meesum cut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Garuku Meesum\" readonly></tr>\n            <tr><input type=\"text\" value=\"Long Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"Yellow Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Empty Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Plankton Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Soil Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Gap gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Black Gill\" readonly></tr>\n            <tr><input type=\"text\" value=\"Brown Gill\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Jiguru\" readonly></tr>\n            <tr><input type=\"text\" value=\"Size Variation\" readonly></tr>\n            <tr><input type=\"text\" value=\"Toka Erupulu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kallu Erupulu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kallu Pakudu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kidney Color Change\" readonly></tr>\n            <tr><input type=\"text\" value=\"Head Water\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Muscle\" readonly></tr>\n            <tr><input type=\"text\" value=\"Minerial Bends\" readonly></tr>\n            <tr><input type=\"text\" value=\"Gottuku Ravadam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Paina Eedadam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Body Cracks\" readonly></tr>\n            <tr><input type=\"text\" value=\"Hatchery Bends\" readonly></tr>\n            <tr><input type=\"text\" value=\"Loose Shell\" readonly></tr>\n            <tr><input type=\"text\" value=\"Deads\" readonly></tr>\n            <tr><input type=\"text\" value=\"Potti Royya\" readonly></tr>\n            <tr><input type=\"text\" value=\"Snail\" readonly></tr>\n            <tr><input type=\"text\" value=\"Theegalu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Chikkadanam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Water Crash\" readonly></tr>\n            <tr><input type=\"text\" value=\"Turbidity\" readonly></tr>\n            <tr><input type=\"text\" value=\"Water Color\" readonly></tr>\n          </tbody>\n        </th>\n        <th *ngFor=\"let CountObservations of countForm.get('CountObservations')['controls'];\n      let j=index\">\n          <tbody [formGroupName]=\"j\">\n            <!-- <tr> {{i+1}}</tr> -->\n            <tr> <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"no_body_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_head_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_new_shell_formation\"></tr>\n            <tr> <input type=\"text\" formControlName=\"meesum_cut_black\"></tr>\n            <tr> <input type=\"text\" formControlName=\"meesum_cut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"garuku_meesum\"></tr>\n            <tr> <input type=\"text\" formControlName=\"long_fecals\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"yellow_fecals\"></tr>\n            <tr> <input type=\"text\" formControlName=\"white_fecals\"></tr>\n            <tr> <input type=\"text\" formControlName=\"white_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"empty_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"plankton_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"soil_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"gap_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"black_gill\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"brown_gill\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_jiguru\"></tr>\n            <tr> <input type=\"text\" formControlName=\"size_variation\"></tr>\n            <tr> <input type=\"text\" formControlName=\"toka_erupulu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kallu_erupulu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kallu_pakudu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kidney_color_change\"></tr>\n            <tr> <input type=\"text\" formControlName=\"head_water\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"white_muscle\"></tr>\n            <tr> <input type=\"text\" formControlName=\"minerial_bends\"></tr>\n            <tr> <input type=\"text\" formControlName=\"gottuku_ravadam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"paina_eedadam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"body_cracks\"></tr>\n            <tr> <input type=\"text\" formControlName=\"hatchery_bends\"></tr>\n            <tr> <input type=\"text\" formControlName=\"loose_shell\"></tr>\n            <tr> <input type=\"text\" formControlName=\"deads\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"potti_royya\"></tr>\n            <tr> <input type=\"text\" formControlName=\"snail\"></tr>\n            <tr> <input type=\"text\" formControlName=\"theegalu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"chikkadanam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"water_crash\"></tr>\n            <tr> <input type=\"text\" formControlName=\"turbidity\"></tr>\n            <tr> <input type=\"text\" formControlName=\"water_color\"></tr>\n          </tbody>\n        </th>\n      </table>\n    </div>\n    <h1 class=\"text-center\">Count Report</h1>\n\n    <div formArrayName=\"CountReport\">\n      <table class=\"table table-responsive\">\n        <tr>\n          <tbody>\n            <th><input type=\"text\" value=\"Tank Name\" readonly></th>\n            <th colspan=\"4\"><input type=\"text\" value=\"Report\" readonly></th>\n          </tbody>\n        </tr>\n        <tr *ngFor=\"let CountReport of countForm.get('CountReport')['controls'];\n      let i=index\">\n          <tbody [formGroupName]=\"i\">\n            <td><input type=\"text\" formControlName=\"tank_name\" readonly></td>\n            <td><input type=\"text\" formControlName=\"report\" placeholder=\"report\"></td>\n          </tbody>\n        </tr>\n      </table>\n    </div>\n    <div class=\"form-group\">\n      <button class=\"btn btn-primary\">Submit</button>\n    </div>\n  </form>\n</div>\n\n<!--Fll Harvest Form and data -->\n<!-- full harvest full harvest --><!-- full harvest full harvest --><!-- full harvest full harvest -->\n<div class=\"card-deck row\" *ngIf=\"fullHarvestFormData\">\n  <form [formGroup]=\"fullharvestForm\" (ngSubmit)=\"onSubmitFullharvestForm()\">\n    <div formArrayName=\"TankInput\">\n      <table class=\"table table-responsive\">\n        <th>\n          <tbody>\n            <tr><input type=\"text\" value=\"Tank NO\" readonly></tr>\n            <tr><input type=\"text\" value=\"Count\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kgs \" readonly></tr>\n            <tr><input type=\"text\" value=\"Price\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kgs\" readonly></tr>\n            <tr><input type=\"text\" value=\"price\" readonly></tr>\n            <tr><input type=\"text\" value=\"Middle Men\" readonly></tr>\n\n          </tbody>\n        </th>\n        <th *ngFor=\"let TankInput of fullharvestForm.get('TankInput')['controls'];\n  let i=index\">\n          <tbody [formGroupName]=\"i\">\n            <!-- <tr> {{i+1}}</tr> -->\n            <tr> <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"count\"></tr>\n            <tr> <input type=\"text\" formControlName=\"harvest_kgs\"></tr>\n            <tr> <input type=\"text\" formControlName=\"harvest_price\"></tr>\n            <tr> <input type=\"text\" formControlName=\"loose_shell_kg\"></tr>\n            <tr> <input type=\"text\" formControlName=\"loose_shell_price\"></tr>\n            <tr> <input type=\"text\" formControlName=\"middleman\"></tr>\n          </tbody>\n        </th>\n      </table>\n    </div>\n    <h1 class=\"text-center\">Full Harvest Observation</h1>\n    <div formArrayName=\"CountObservations\">\n      <table class=\"table table-responsive\">\n        <th>\n          <tbody>\n            <tr><input type=\"text\" value=\"Tank Name\" readonly></tr>\n            <tr><input type=\"text\" value=\"No body Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Head Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No new shell formation\" readonly></tr>\n            <tr><input type=\"text\" value=\"Meesum cut Black\" readonly></tr>\n            <tr><input type=\"text\" value=\"Meesum cut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Garuku Meesum\" readonly></tr>\n            <tr><input type=\"text\" value=\"Long Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"Yellow Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Empty Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Plankton Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Soil Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Gap gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Black Gill\" readonly></tr>\n            <tr><input type=\"text\" value=\"Brown Gill\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Jiguru\" readonly></tr>\n            <tr><input type=\"text\" value=\"Size Variation\" readonly></tr>\n            <tr><input type=\"text\" value=\"Toka Erupulu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kallu Erupulu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kallu Pakudu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kidney Color Change\" readonly></tr>\n            <tr><input type=\"text\" value=\"Head Water\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Muscle\" readonly></tr>\n            <tr><input type=\"text\" value=\"Minerial Bends\" readonly></tr>\n            <tr><input type=\"text\" value=\"Gottuku Ravadam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Paina Eedadam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Body Cracks\" readonly></tr>\n            <tr><input type=\"text\" value=\"Hatchery Bends\" readonly></tr>\n            <tr><input type=\"text\" value=\"Loose Shell\" readonly></tr>\n            <tr><input type=\"text\" value=\"Deads\" readonly></tr>\n            <tr><input type=\"text\" value=\"Potti Royya\" readonly></tr>\n            <tr><input type=\"text\" value=\"Snail\" readonly></tr>\n            <tr><input type=\"text\" value=\"Theegalu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Chikkadanam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Water Crash\" readonly></tr>\n            <tr><input type=\"text\" value=\"Turbidity\" readonly></tr>\n            <tr><input type=\"text\" value=\"Water Color\" readonly></tr>\n          </tbody>\n        </th>\n        <th *ngFor=\"let CountObservations of fullharvestForm.get('CountObservations')['controls'];\n      let j=index\">\n          <tbody [formGroupName]=\"j\">\n            <!-- <tr> {{i+1}}</tr> -->\n            <tr> <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"no_body_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_head_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_new_shell_formation\"></tr>\n            <tr> <input type=\"text\" formControlName=\"meesum_cut_black\"></tr>\n            <tr> <input type=\"text\" formControlName=\"meesum_cut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"garuku_meesum\"></tr>\n            <tr> <input type=\"text\" formControlName=\"long_fecals\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"yellow_fecals\"></tr>\n            <tr> <input type=\"text\" formControlName=\"white_fecals\"></tr>\n            <tr> <input type=\"text\" formControlName=\"white_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"empty_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"plankton_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"soil_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"gap_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"black_gill\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"brown_gill\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_jiguru\"></tr>\n            <tr> <input type=\"text\" formControlName=\"size_variation\"></tr>\n            <tr> <input type=\"text\" formControlName=\"toka_erupulu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kallu_erupulu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kallu_pakudu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kidney_color_change\"></tr>\n            <tr> <input type=\"text\" formControlName=\"head_water\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"white_muscle\"></tr>\n            <tr> <input type=\"text\" formControlName=\"minerial_bends\"></tr>\n            <tr> <input type=\"text\" formControlName=\"gottuku_ravadam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"paina_eedadam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"body_cracks\"></tr>\n            <tr> <input type=\"text\" formControlName=\"hatchery_bends\"></tr>\n            <tr> <input type=\"text\" formControlName=\"loose_shell\"></tr>\n            <tr> <input type=\"text\" formControlName=\"deads\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"potti_royya\"></tr>\n            <tr> <input type=\"text\" formControlName=\"snail\"></tr>\n            <tr> <input type=\"text\" formControlName=\"theegalu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"chikkadanam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"water_crash\"></tr>\n            <tr> <input type=\"text\" formControlName=\"turbidity\"></tr>\n            <tr> <input type=\"text\" formControlName=\"water_color\"></tr>\n          </tbody>\n        </th>\n      </table>\n    </div>\n    <h1 class=\"text-center\"> Report</h1>\n\n    <div formArrayName=\"CountReport\">\n      <table class=\"table table-responsive\">\n        <tr>\n          <tbody>\n            <th><input type=\"text\" value=\"Tank Name\" readonly></th>\n            <th colspan=\"4\"><input type=\"text\" value=\"Report\" readonly></th>\n          </tbody>\n        </tr>\n        <tr *ngFor=\"let CountReport of fullharvestForm.get('CountReport')['controls'];\n      let i=index\">\n          <tbody [formGroupName]=\"i\">\n            <td><input type=\"text\" formControlName=\"tank_name\" readonly></td>\n            <td><input type=\"text\" formControlName=\"report\" placeholder=\"report\"></td>\n          </tbody>\n        </tr>\n      </table>\n    </div>\n    <div class=\"form-group\">\n      <button class=\"btn btn-primary\">Submit</button>\n    </div>\n  </form>\n</div>\n\n<!-- Harvest Form and data -->\n<!-- Half harvest full harvest --><!-- Half harvest full harvest --><!-- Half harvest full harvest -->\n<div class=\"card-deck row\" *ngIf=\"halfHarvestFormData\">\n  <form [formGroup]=\"halfharvestform\" (ngSubmit)=\"onSubmitharvestForm()\">\n    <div formArrayName=\"TankInput\">\n      <table class=\"table table-responsive\">\n        <th>\n          <tbody>\n            <tr><input type=\"text\" value=\"Tank NO\" readonly></tr>\n            <tr><input type=\"text\" value=\"Count\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kgs \" readonly></tr>\n            <tr><input type=\"text\" value=\"Price\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kgs\" readonly></tr>\n            <tr><input type=\"text\" value=\"price\" readonly></tr>\n            <tr><input type=\"text\" value=\"Middle Men\" readonly></tr>\n\n          </tbody>\n        </th>\n        <th *ngFor=\"let TankInput of halfharvestform.get('TankInput')['controls'];\n  let i=index\">\n          <tbody [formGroupName]=\"i\">\n            <!-- <tr> {{i+1}}</tr> -->\n            <tr> <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"count\"></tr>\n            <tr> <input type=\"text\" formControlName=\"harvest_kgs\"></tr>\n            <tr> <input type=\"text\" formControlName=\"harvest_price\"></tr>\n            <tr> <input type=\"text\" formControlName=\"loose_shell_kg\"></tr>\n            <tr> <input type=\"text\" formControlName=\"loose_shell_price\"></tr>\n            <tr> <input type=\"text\" formControlName=\"middleman\"></tr>\n          </tbody>\n        </th>\n      </table>\n    </div>\n    <h1 class=\"text-center\">Partial Harvest Observation</h1>\n    <div formArrayName=\"CountObservations\">\n      <table class=\"table table-responsive\">\n        <th>\n          <tbody>\n            <tr><input type=\"text\" value=\"Tank Name\" readonly></tr>\n            <tr><input type=\"text\" value=\"No body Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Head Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Moulting\" readonly></tr>\n            <tr><input type=\"text\" value=\"No new shell formation\" readonly></tr>\n            <tr><input type=\"text\" value=\"Meesum cut Black\" readonly></tr>\n            <tr><input type=\"text\" value=\"Meesum cut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Garuku Meesum\" readonly></tr>\n            <tr><input type=\"text\" value=\"Long Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"Yellow Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Fecals\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Empty Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Plankton Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Soil Gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Gap gut\" readonly></tr>\n            <tr><input type=\"text\" value=\"Black Gill\" readonly></tr>\n            <tr><input type=\"text\" value=\"Brown Gill\" readonly></tr>\n            <tr><input type=\"text\" value=\"No Jiguru\" readonly></tr>\n            <tr><input type=\"text\" value=\"Size Variation\" readonly></tr>\n            <tr><input type=\"text\" value=\"Toka Erupulu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kallu Erupulu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kallu Pakudu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kidney Color Change\" readonly></tr>\n            <tr><input type=\"text\" value=\"Head Water\" readonly></tr>\n            <tr><input type=\"text\" value=\"White Muscle\" readonly></tr>\n            <tr><input type=\"text\" value=\"Minerial Bends\" readonly></tr>\n            <tr><input type=\"text\" value=\"Gottuku Ravadam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Paina Eedadam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Body Cracks\" readonly></tr>\n            <tr><input type=\"text\" value=\"Hatchery Bends\" readonly></tr>\n            <tr><input type=\"text\" value=\"Loose Shell\" readonly></tr>\n            <tr><input type=\"text\" value=\"Deads\" readonly></tr>\n            <tr><input type=\"text\" value=\"Potti Royya\" readonly></tr>\n            <tr><input type=\"text\" value=\"Snail\" readonly></tr>\n            <tr><input type=\"text\" value=\"Theegalu\" readonly></tr>\n            <tr><input type=\"text\" value=\"Chikkadanam\" readonly></tr>\n            <tr><input type=\"text\" value=\"Water Crash\" readonly></tr>\n            <tr><input type=\"text\" value=\"Turbidity\" readonly></tr>\n            <tr><input type=\"text\" value=\"Water Color\" readonly></tr>\n          </tbody>\n        </th>\n        <th *ngFor=\"let CountObservations of halfharvestform.get('CountObservations')['controls'];\n      let j=index\">\n          <tbody [formGroupName]=\"j\">\n            <!-- <tr> {{i+1}}</tr> -->\n            <tr> <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"no_body_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_head_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_moulting\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_new_shell_formation\"></tr>\n            <tr> <input type=\"text\" formControlName=\"meesum_cut_black\"></tr>\n            <tr> <input type=\"text\" formControlName=\"meesum_cut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"garuku_meesum\"></tr>\n            <tr> <input type=\"text\" formControlName=\"long_fecals\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"yellow_fecals\"></tr>\n            <tr> <input type=\"text\" formControlName=\"white_fecals\"></tr>\n            <tr> <input type=\"text\" formControlName=\"white_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"empty_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"plankton_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"soil_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"gap_gut\"></tr>\n            <tr> <input type=\"text\" formControlName=\"black_gill\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"brown_gill\"></tr>\n            <tr> <input type=\"text\" formControlName=\"no_jiguru\"></tr>\n            <tr> <input type=\"text\" formControlName=\"size_variation\"></tr>\n            <tr> <input type=\"text\" formControlName=\"toka_erupulu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kallu_erupulu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kallu_pakudu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"kidney_color_change\"></tr>\n            <tr> <input type=\"text\" formControlName=\"head_water\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"white_muscle\"></tr>\n            <tr> <input type=\"text\" formControlName=\"minerial_bends\"></tr>\n            <tr> <input type=\"text\" formControlName=\"gottuku_ravadam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"paina_eedadam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"body_cracks\"></tr>\n            <tr> <input type=\"text\" formControlName=\"hatchery_bends\"></tr>\n            <tr> <input type=\"text\" formControlName=\"loose_shell\"></tr>\n            <tr> <input type=\"text\" formControlName=\"deads\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"potti_royya\"></tr>\n            <tr> <input type=\"text\" formControlName=\"snail\"></tr>\n            <tr> <input type=\"text\" formControlName=\"theegalu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"chikkadanam\"></tr>\n            <tr> <input type=\"text\" formControlName=\"water_crash\"></tr>\n            <tr> <input type=\"text\" formControlName=\"turbidity\"></tr>\n            <tr> <input type=\"text\" formControlName=\"water_color\"></tr>\n          </tbody>\n        </th>\n      </table>\n    </div>\n    <h1 class=\"text-center\"> Report</h1>\n\n    <div formArrayName=\"CountReport\">\n      <table class=\"table table-responsive\">\n        <tr>\n          <tbody>\n            <th><input type=\"text\" value=\"Tank Name\" readonly></th>\n            <th colspan=\"4\"><input type=\"text\" value=\"Report\" readonly></th>\n          </tbody>\n        </tr>\n        <tr *ngFor=\"let CountReport of halfharvestform.get('CountReport')['controls'];\n      let i=index\">\n          <tbody [formGroupName]=\"i\">\n            <td><input type=\"text\" formControlName=\"tank_name\" readonly></td>\n            <td><input type=\"text\" formControlName=\"report\" placeholder=\"report\"></td>\n          </tbody>\n        </tr>\n      </table>\n    </div>\n    <div class=\"form-group\">\n      <button class=\"btn btn-primary\">Submit</button>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/feed-input/cultivation-stage/cultivation-stage.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/feed-input/cultivation-stage/cultivation-stage.component.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<hr>\n<span>Select :</span>\n<div class=\"row\">\n  <mat-radio-group class=\"example-radio-group\" name=\"fieldname\" (change)=\"changeComboo($event)\"\n    [(ngModel)]=\"SelectedInput\" ngDefaultControl>\n    <mat-radio-button class=\"example-radio-button\" *ngFor=\"let x of selectInputs\" [value]=\"x\" style=\"margin:1rem;\">  {{ x }}\n    </mat-radio-button>\n  </mat-radio-group>\n</div>\n<hr>\n<div class=\"input-container\">\n  <div class=\"example-selected-value\">{{SelectedInput}}</div>\n  <div *ngIf=\"SelectedInput=='Feed'\">\n    <form (submit)=\"postAddFeed(AddFeed)\" #AddFeed=\"ngForm\">\n      <div class=\"row\">\n        <div class=\" col-md-3\">\n          <span>Select Farm</span>\n          <select class=\"form-control\" ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n            <option value=\"\">Select Farm </option>\n            <option *ngFor=\"let farm of postsFarmOwner\" [value]=\"farm.farmId\">{{farm.firstName}} {{farm.lastName}}\n            </option>\n          </select>\n        </div>\n        <div class=\"col-md-4\">\n          <span>Select Feed</span>\n          <select class=\"form-control\" ngModel name=\"feedName\" #feedName=\"ngModel\" required>\n            <option value=\"\">Select Feed</option>\n            <option *ngFor=\"let feed of selectFeeds\" [value]=\"feed\">{{feed}}</option>\n          </select>\n        </div>\n        <div class=\"col-md-4\">\n          <span>Select Tank</span>\n          <select class=\"form-control\" ngModel name=\"tankId\" #tankId=\"ngModel\" required>\n            <option value=\"\">Select Tank</option>\n            <option *ngFor=\"let tank of selectTanks\" [value]=\"tank\">{{tank}}</option>\n          </select>\n        </div>\n\n      </div>\n      <hr>\n      <div class=\"row\">\n        <div class=\"col-md-8\">\n          <span>Feed Quantity </span>\n          <label for=\"quantity\">\n            <input type=\"number\" class=\"form-control\" ngModel name=\"quantity\" #quantity=\"ngModel\"\n              placeholder=\"Enter Quantity \" id=\"quantity\" required min=\"0\">\n          </label></div>\n\n      </div>\n      <hr>\n      <label for=\"Medicine\">Feed Medicine</label>\n      <hr>\n      <div class=\"row\">\n        <div class=\"col-md-8\">\n          <tr *ngFor=\"let field of fieldArray1; let i = index\">\n            <td>\n          <span>List Feed Medicine </span>\n          <label for=\"quantity\">\n            <select class=\"form-control\" [(ngModel)]=\"field.medicines\" name=\"field.medicines\"  required>\n              <option value=\"\">Select Medicine</option>\n              <option *ngFor=\"let medicines of selectMedicines\" [value]=\"medicines\">{{medicines}}</option>\n            </select>\n          </label>\n        </td>\n      </tr>\n        </div>\n        <div class=\"col-md-4\">\n          <tr><th>\n          <label style=\"margin: 1rem;\">\n            <button type=\"button\" class=\"btn btn-light\" (click)=\"addFieldValue1()\" >Add Medicine</button>\n            <button type=\"button\" class=\"btn btn-primary\"  (click)=\"deleteFieldValue1(i)\">Delete Medicine</button>\n          </label>\n        </th>\n        </tr>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-8 table-responsive\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th>Sr No</th>\n                <th>Frequency (gms)</th>\n                <th>Frequency</th>\n                <th>Total Medicine</th>\n                <!-- <th>Add/Delete</th> -->\n              </tr>\n            </thead>\n            <tbody *ngIf=\"!isEditItems\">\n              <tr *ngFor=\"let field of fieldArray; let i = index\">\n                <td>{{i+1}}</td>\n                <td><input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.gutCare\"  name=\"field.gutCare\"\n                    placeholder=\"Enter Gut Care \" id=\"gutCare\">\n                </td>\n                <td><input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.gutCareUnit\"  name=\"field.gutCareUnit\"\n                    placeholder=\"Enter Frequency \" id=\"gutCareUnit\">\n                </td>\n                <td><input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.totalMedicine\"  name=\"field.totalMedicine\"\n                    placeholder=\"Total \" id=\"totalMedicine\">\n                </td>\n                <td>\n               \n              </td>\n              </tr>\n            </tbody>\n            <tr>\n              <td align=\"right\" colspan=\"3\">\n                <!-- <button *ngIf=\"fieldArray.length <= 10\" class=\"btn btn-secondary btn-lg1\" type=\"button\" (click)=\"addFieldValue()\" style=\"margin-right:10px\">Add</button> -->\n                <button (click)=\"deleteFieldValue(i)\" class=\"btn btn-danger\" type=\"button\">Delete</button>\n                <button *ngIf=\"fieldArray.length <= 10\" class=\"btn btn-success \"  (click)=\"addFieldValue()\" type=\"button\">Add</button>\n                <!-- <button (click)=\"onEditCloseItems()\" class=\"btn btn-primary\" type=\"button\">Save</button> -->\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary float-right\" [disabled]=\"!AddFeed.valid\">Submit</button>\n    </form>\n    <hr>\n  </div>\n\n\n  <div *ngIf=\"SelectedInput=='Water Medicine'\">\n    <form (submit)=\"postAddWaterMedicine(AddWaterMedicine)\" #AddWaterMedicine=\"ngForm\">\n      <div class=\"row\">\n        <div class=\" col-md-6\">\n          <span>Select Farm</span>\n          <select class=\"form-control\" ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n            <option value=\"\">Select Farm </option>\n            <option *ngFor=\"let farm of postsFarmOwner\" [value]=\"farm.farmId\">{{farm.firstName}} {{farm.lastName}}\n            </option>\n          </select>\n        </div>\n        <div class=\"col-md-6\">\n          <span>Select Tank</span>\n          <select class=\"form-control\" ngModel name=\"tankId\" #tankId=\"ngModel\" required>\n            <option value=\"\">Select Tank</option>\n            <option *ngFor=\"let tank of selectTanks\" [value]=\"tank\">{{tank}}</option>\n          </select>\n        </div>\n      </div>\n      <hr>\n      <label for=\"Medicine\">Water Medicine</label>\n      <hr>\n      <div class=\"row\">\n        <div class=\"col-md-8\">\n          <tr *ngFor=\"let field of fieldArray1; let i = index\">\n            <td>\n          <span>List Water Medicine </span>\n          <label for=\"quantity\">\n            <select class=\"form-control\" [(ngModel)]=\"field.medicines\" name=\"field.medicines\"  required>\n              <option value=\"\">Select Medicine</option>\n              <option *ngFor=\"let medicines of selectMedicines\" [value]=\"medicines\">{{medicines}}</option>\n            </select>\n          </label>\n        </td>\n      </tr>\n        </div>\n        <div class=\"col-md-4\">\n          <tr><th>\n          <label style=\"margin: 1rem;\">\n            <button type=\"button\" class=\"btn btn-light\" value=\"addMedicine\" (click)=\"addFieldValue1()\" >Add Medicine</button>\n            <button type=\"button\" class=\"btn btn-primary\" value=\"addMedicine\" (click)=\"deleteFieldValue1(i)\">Delete Medicine</button>\n          </label>\n        </th>\n        </tr>\n        </div>\n      </div>\n      <hr>\n      <span>Active Water Medicine</span>\n      <div class=\"row\">\n        <div class=\"col-md-8\">\n          <table>\n            <thead>\n              <tr>\n                <th>Sr No</th>\n                <th>Frequency (gms)</th>\n                <th>Frequency</th>\n                <th>Time (HH:MM)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let field of fieldArray; let i = index\">\n                <td>{{i+1}}</td>\n                <td><input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.gutCare\" name=\"field.gutCare\"\n                    placeholder=\"Enter Gut Care \" id=\"gutCare\">\n                </td>\n                <td><input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.gutCareUnit\" name=\"field.gutCareUnit\" \n                    placeholder=\"Enter Frequency \" id=\"gutCareUnit\">\n                </td>\n                <td>\n                  <input id=\"appt-time\" class=\"form-control\" [(ngModel)]=\"field.time\"  name=\"field.time\"  type=\"time\"\n                    name=\"appt-time\" value=\"13:30\">\n\n                </td>\n              </tr>\n              <tr>\n                <td align=\"right\" colspan=\"3\">\n                  <!-- <button *ngIf=\"fieldArray.length <= 10\" class=\"btn btn-secondary btn-lg1\" type=\"button\" (click)=\"addFieldValue()\" style=\"margin-right:10px\">Add</button> -->\n                  <button (click)=\"deleteFieldValue(i)\" class=\"btn btn-danger\" type=\"button\">Delete</button>\n                  <button *ngIf=\"fieldArray.length <= 10\" class=\"btn btn-success \"  (click)=\"addFieldValue()\" type=\"button\">Add</button>\n                  <!-- <button (click)=\"onEditCloseItems()\" class=\"btn btn-primary\" type=\"button\">Save</button> -->\n                </td>\n              </tr>\n          </table>\n        </div>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary float-right\" [disabled]=\"!AddWaterMedicine.valid\">Submit</button>\n      <hr>\n    </form>\n  </div>\n\n\n  <div *ngIf=\"SelectedInput=='CheckNet'\">\n    <form (submit)=\"postAddCheckNet(AddCheckNet)\" #AddCheckNet=\"ngForm\">\n      <div class=\"row\">\n        <div class=\" col-md-3\">\n          <span>Select Farm</span>\n          <select class=\"form-control\" ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n            <option value=\"\">Select Farm </option>\n            <option *ngFor=\"let farm of postsFarmOwner\" [value]=\"farm.farmId\">{{farm.firstName}} {{farm.lastName}}\n            </option>\n          </select>\n        </div>\n        <div class=\"col-md-4\">\n          <span>Select Feed</span>\n          <select class=\"form-control\" ngModel name=\"feedName\" #feedName=\"ngModel\" required>\n            <option value=\"\">Select Feed</option>\n            <option *ngFor=\"let feed of selectFeeds\" [value]=\"feed\">{{feed}}</option>\n          </select>\n        </div>\n        <div class=\"col-md-4\">\n          <span>Select Tank</span>\n          <select class=\"form-control\" ngModel name=\"tankId\" #tankId=\"ngModel\" required>\n            <option value=\"\">Select Tank</option>\n            <option *ngFor=\"let tank of selectTanks\" [value]=\"tank\">{{tank}}</option>\n          </select>\n        </div>\n\n      </div>\n      <hr>\n      <div class=\"row\">\n        <label for=\"exampleFormControlSelect2\" style=\"margin: 1rem;\">How Much Left</label>\n        <table>\n          <tbody>\n              <tr *ngFor=\"let field of fieldArray; let i = index\">\n              <th><span style=\"margin: 1rem;\">CN{{i+1}}</span></th>\n              <th>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.leftCheckNet\" name=\"field.leftCheckNet\"\n                placeholder=\"Enter leftCheckNet \">\n              </th>\n            </tr>\n            <tr>\n              <th><button type=\"button\" class=\"btn btn-light\" (click)=\"addFieldValue()\" >Add </button>\n                <button type=\"button\" class=\"btn btn-primary\"  (click)=\"deleteFieldValue(i)\">Delete </button></th>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary float-right\" [disabled]=\"!AddCheckNet.valid\">Submit</button>\n\n    </form>\n  </div>\n  <div *ngIf=\"SelectedInput=='Shrimp Condition'\">\n    <form (submit)=\"postAddShrimpCondition(ShrimpCondition)\" #ShrimpCondition=\"ngForm\">\n      <div class=\"row\">\n        <div class=\" col-md-6\">\n          <span>Select Farm</span>\n          <select class=\"form-control\" ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n            <option value=\"\">Select Farm </option>\n            <option *ngFor=\"let farm of postsFarmOwner\" [value]=\"farm.farmId\">{{farm.firstName}} {{farm.lastName}}\n            </option>\n          </select>\n        </div>\n        <div class=\"col-md-6\">\n          <span>Select Tank</span>\n          <select class=\"form-control\" ngModel name=\"tankId\" #tankId=\"ngModel\" required>\n            <option value=\"\">Select Tank</option>\n            <option *ngFor=\"let tank of selectTanks\" [value]=\"tank\">{{tank}}</option>\n          </select>\n        </div>\n      </div>\n      <hr>\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <span >Select Serverity</span>\n          <select class=\"form-control\" ngModel name=\"serverity\" #serverity=\"ngModel\" required>\n            <option value=\"\">Select </option>\n            <option *ngFor=\"let serverity of selectServerity\" value=\"{{serverity}}\">{{serverity}}</option>\n          </select>\n        </div>\n        <div class=\"col-md-6\">\n          <span>Upload Image</span>\n          <div class=\"file-upload-wrapper\">\n            <input type=\"file\" id=\"input-file-now-custom-2\" \n            ngModel name=\"file\" #file=\"ngModel\" class=\"file-upload\" data-height=\"500\" required />\n          </div>\n\n        </div>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary float-right\" [disabled]=\"!ShrimpCondition.valid\">Submit</button>\n\n\n    </form>\n  </div>\n  <div *ngIf=\"SelectedInput=='Water Condition'\">\n    <form (submit)=\"postAddWaterCondition(WaterCondition)\" #WaterCondition=\"ngForm\">\n      <div class=\"row\">\n        <div class=\" col-md-6\">\n          <span>Select Farm</span>\n          <select class=\"form-control\" ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n            <option value=\"\">Select Farm </option>\n            <option *ngFor=\"let farm of postsFarmOwner\" [value]=\"farm.farmId\">{{farm.firstName}} {{farm.lastName}}\n            </option>\n          </select>\n        </div>\n        <div class=\"col-md-6\">\n          <span>Select Tank</span>\n          <select class=\"form-control\" ngModel name=\"tankId\" #tankId=\"ngModel\" required>\n            <option value=\"\">Select Tank</option>\n            <option *ngFor=\"let tank of selectTanks\" [value]=\"tank\">{{tank}}</option>\n          </select>\n        </div>\n      </div>\n      <hr>\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <span >Select Serverity</span>\n          <select class=\"form-control\" ngModel name=\"serverity\" #serverity=\"ngModel\" required>\n            <option value=\"\">Select </option>\n            <option *ngFor=\"let serverity of selectServerity\" value=\"{{serverity}}\">{{serverity}}</option>\n          </select>\n        </div>\n        <div class=\"col-md-6\">\n          <span>Upload Image</span>\n          <div class=\"file-upload-wrapper\">\n            <input type=\"file\" id=\"input-file-now-custom-2\" \n            ngModel name=\"file\" #file=\"ngModel\" class=\"file-upload\" data-height=\"500\" required />\n          </div>\n        </div>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary float-right\" [disabled]=\"!WaterCondition.valid\">Submit</button>\n    </form>\n  </div>\n  <div *ngIf=\"SelectedInput=='Water Report'\">\n    <form (submit)=\"postAddWaterReport(AddWaterReport)\" #AddWaterReport=\"ngForm\">\n    <div class=\"row\">\n      <div class=\" col-md-6\">\n        <span>Select Farm</span>\n        <select class=\"form-control\" ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n          <option value=\"\">Select Farm </option>\n          <option *ngFor=\"let farm of postsFarmOwner\" [value]=\"farm.farmId\">{{farm.firstName}} {{farm.lastName}}\n          </option>\n        </select>\n      </div>\n      <div class=\"col-md-6\">\n        <span>Select Tank</span>\n        <select class=\"form-control\" ngModel name=\"waterPhReport\" #waterPhReport=\"ngModel\" required>\n          <option value=\"\">Select Tank</option>\n          <option *ngFor=\"let tank of selectTanks\" [value]=\"tank\">{{tank}}</option>\n        </select>\n      </div>\n    </div>\n    <hr>\n    <span>Water Report</span>\n    <div class=\"row\">\n      <div class=\"col-md-6 table-responsive\">\n        <table class=\"table\">\n          <thead>\n            <tr>\n              <th>Ph</th>\n              <th>AM</th>\n              <th>PM</th>\n            </tr>\n            <tr >\n              <th></th>\n              <th *ngFor=\"let field of fieldArray2; let i = index\">\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.waterPhReport\"\n                 name=\"field.waterPhReport\"\n                required></th>\n              <!-- <th><input type=\"number\" class=\"form-control\" id=\"CNs\" required></th> -->\n            </tr>\n          </thead>\n        </table>\n        <button type=\"button\" class=\"btn btn-primary float-right\">Submit</button>\n      </div>\n      <div class=\"col-md-6 table-responsive\">\n        <table class=\"table\">\n          <thead>\n            <tr>\n              <th>Water Turbidity</th>\n              <th>AM</th>\n              <th>PM</th>\n            </tr>\n            <tr >\n              <th></th>\n              <th *ngFor=\"let field of fieldArray3; let i = index\">\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.waterTributeReport\"\n                 name=\"field.waterTributeReport\" \n                 required ></th>\n            </tr>\n          </thead>\n        </table>\n        <button type=\"button\" class=\"btn btn-primary float-right\">Submit</button>\n      </div>\n\n    </div>\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-md-6 table-responsive\">\n        <table class=\"table\">\n          <thead>\n            <tr>\n              <th>Do</th>\n              <th>AM</th>\n              <th>PM</th>\n            </tr>\n            <tr >\n              <th></th>\n              <th *ngFor=\"let field of fieldArray4; let i = index\">\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"field.waterDoReport\" \n                name=\"field.waterDoReport\"\n                required></th>\n            </tr>\n          </thead>\n        </table>\n        <button type=\"submit\" class=\"btn btn-primary float-right\" [disabled]=\"!AddWaterReport.valid\">Submit</button>\n      </div>\n    </div>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/feed-input/feed-checknet/feed-checknet.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/feed-input/feed-checknet/feed-checknet.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"main-content\">\n  <div class=\"container-fluid\"> -->\n<hr>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n    <button type=\"button\" id=\"b1\" class=\"btn btn-info\" [ngClass]=\"['bntStyle']\" (click)=\"loadFeed();\"\n      value=\"Feed\">Feed</button>\n  </div>\n  <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n    <button type=\"button\" id=\"b2\" class=\"btn btn-info\" (click)=\"loadChecknet();\">CheckNets</button>\n  </div>\n</div>\n<hr>\n<div class=\"row\">\n  <mat-radio-group class=\"example-radio-group\" name=\"fieldname\" (change)=\"changeFeed($event)\"\n    [(ngModel)]=\"SelectedFeeds\" ngDefaultControl>\n    <mat-radio-button class=\"example-radio-button\" *ngFor=\"let x of selectFeeds\" [value]=\"x\" style=\"margin:1rem;\">\n      {{ x }}\n    </mat-radio-button>\n  </mat-radio-group>\n</div>\n<hr>\n\n<div class=\"row\" *ngIf=\"div_feed\">\n  <div class=\"col-md-12 offset-md-12\">\n    <form [formGroup]=\"feedsform\" (ngSubmit)=\"onSubmit()\">\n      <div formArrayName=\"TankInput\">\n        <div>\n          <table class=\"table table-responsive\" style=\"padding: 0%;\">\n            <tr>\n              <tbody>\n              <th><input type=\"text\" value=\"Tank name\" readonly></th>\n              <th><input type=\"text\" value=\"Feed\" readonly></th>\n              <th><input type=\"text\" value=\"Code\" readonly></th>\n              <th><input type=\"text\" value=\"Quantity\" readonly></th>\n              <th><input type=\"text\" value=\"CN gm/Kg\" readonly></th>\n              <th><input type=\"text\" value=\"CN gm\" readonly></th>\n            </tbody>\n            </tr>\n            <tr *ngFor=\"let TankInput of feedsform.get('TankInput')['controls'];let i=index\">\n              <tbody [formGroupName]=\"i\">\n                <th><input type=\"text\" formControlName=\"tank_name\" readonly></th>\n                <th><input type=\"text\" formControlName=\"feed\"></th>\n                <th><input type=\"text\" formControlName=\"code\"></th>\n                <th><input type=\"text\" formControlName=\"quantity_kg\"></th>\n                <th><input type=\"text\" formControlName=\"cn_gm_kg\"></th>\n                <th><input type=\"text\" formControlName=\"cn_gm\"></th>\n              </tbody>\n            </tr>\n          </table>\n        </div>\n      <!-- </div> -->\n  </div>\n  <hr>\n  <div class=\"form-group\">\n    <button class=\"btn btn-primary\">Submit</button>\n  </div>\n  </form>\n</div>\n</div>\n<!-- Checknets data -->\n<div class=\"card-deck row\" *ngIf=\"div_checkNet\">\n  <form [formGroup]=\"checkNetform\" (ngSubmit)=\"onSubmitCheckNet()\">\n    <div formArrayName=\"TankInput\">\n      <table class=\"table table-responsive\">\n        <th >\n          <tbody>\n            <tr><input type=\"text\" value=\"Tank NO\" readonly></tr>\n            <tr><input type=\"text\" value=\"Gm/CN\" readonly></tr>\n            <tr><input type=\"text\" value=\"Avg Left \" readonly></tr>\n            <tr><input type=\"text\" value=\"Total Left\" readonly></tr>\n            <tr><input type=\"text\" value=\"NS/CN\" readonly></tr>\n            <tr><input type=\"text\" value=\"Kalakalu\" readonly></tr>\n            <tr><input type=\"text\" value=\"CN1\" readonly></tr>\n            <tr><input type=\"text\" value=\"CN2\" readonly></tr>\n            <tr><input type=\"text\" value=\"CN3\" readonly></tr>\n            <tr><input type=\"text\" value=\"CN4\" readonly></tr>\n          </tbody>\n        </th>\n        <th *ngFor=\"let TankInput of checkNetform.get('TankInput')['controls'];\n      let i=index\">\n          <tbody [formGroupName]=\"i\">\n            <!-- <tr> {{i+1}}</tr> -->\n            <tr> <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n            <tr> <input type=\"text\" formControlName=\"GmperCN\"></tr>\n            <tr> <input type=\"text\" formControlName=\"Avgleft\"></tr>\n            <tr> <input type=\"text\" formControlName=\"Totalleft\"></tr>\n            <tr> <input type=\"text\" formControlName=\"NSperCN\"></tr>\n            <tr> <input type=\"text\" formControlName=\"Kalakalu\"></tr>\n            <tr> <input type=\"text\" formControlName=\"eachCN1\"></tr>\n            <tr> <input type=\"text\" formControlName=\"eachCN2\"></tr>\n            <tr> <input type=\"text\" formControlName=\"eachCN3\"></tr>\n            <tr> <input type=\"text\" formControlName=\"eachCN4\"></tr>\n          </tbody>\n        </th>\n      </table>\n    </div>\n    <div class=\"form-group\">\n      <button class=\"btn btn-primary\">Submit</button>\n    </div>\n  </form>\n</div>\n<!-- <div>\n  <label>TankName</label>\n  <input type=\"text\" formControlName=\"tank_name\" class=\"form-control\">\n</div>\n<div>\n  <label>Feed</label>\n  <input type=\"text\" formControlName=\"feed\" class=\"form-control\">\n</div>\n<div>\n  <label>Code</label>\n  <input type=\"text\" formControlName=\"code\" class=\"form-control\">\n</div>\n<div>\n  <label>Quantity Kg</label>\n  <input type=\"text\" formControlName=\"quantity_kg\" class=\"form-control\">\n</div>\n<div>\n  <label>Cn gm/kg</label>\n  <input type=\"text\" formControlName=\"cn_gm_kg\" class=\"form-control\">\n</div>\n<div>\n  <label>Cn gm</label>\n  <input type=\"text\" formControlName=\"cn_gm\" class=\"form-control\">\n</div> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/feed-input/feed-input.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/feed-input/feed-input.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"container-fluid\">\n    <!-- <span>Current Phase:</span> -->\n    <div class=\"row\">\n      <div class=\"col-sm-3 col-md-6 col-lg-4 col-xl-3\">\n        <label for=\"selectFarm\">Select Farm</label>\n        <select class=\"form-control\" \n        ngModel name=\"selectFarm\" #selectFarm=\"ngModel\" (change)=\"selectedFarm(selectFarm)\" required>\n          <option value=\"\">Select Farm</option>\n          <option *ngFor=\"let getFarm of farmData.posts\" [ngValue]=\"getFarm\">\n            {{getFarm.farmId}}</option>\n        </select>\n      </div>\n       <div class=\"col-sm-3 col-md-6 col-lg-4 col-xl-3\">\n        <label for=\"selectFarm\">Select Date</label>\n        <input type=\"date\" class=\"form-control\"  (change)=\"selectedDateFun(selectedDate)\"\n        ngModel name=\"selectedDate\" #selectedDate=\"ngModel\"\n         placeholder=\"Enter Dosage \" id=\"selectedDate\" required>\n      </div>\n\n    </div>\n    <div class=\"row\" *ngIf=\"selectedFarmId && selectedFarmDate\">\n      <div class=\"col-sm-2 col-md-2 col-lg-2 col-xl-2\">\n        <button type=\"button\" id=\"b1\" class=\"btn btn-info\" \n        [ngClass]=\"['bntStyle']\" (click)=\"loadFeedAndChecknet();\">Feed & Checknet</button>\n      </div>\n      <div class=\"col-sm-2 col-md-2 col-lg-2 col-xl-2\">\n        <button type=\"button\" id=\"b2\" class=\"btn btn-info\"\n         (click)=\"loadWaterReportMedicine();\">Water Report & Medicine</button>\n      </div>\n      <div class=\"col-sm-2 col-md-2 col-lg-2 col-xl-2\">\n        <button type=\"button\" id=\"b3\" class=\"btn btn-info\" \n        (click)=\"loadObservations();\">Observation</button>\n      </div>\n      <div class=\"col-sm-2 col-md-2 col-lg-2 col-xl-2\">\n        <button type=\"button\" id=\"b4\" class=\"btn btn-info\" (click)=\"loadCountHarvest();\">Count & Harvest</button>\n      </div>\n      <div class=\"col-sm-2 col-md-2 col-lg-2 col-xl-2\">\n        <button type=\"button\" id=\"b5\" class=\"btn btn-info\" (click)=\"loadStockStocking();\">Stock & Stocking</button>\n      </div>\n    </div>\n   \n    <app-feed-checknet *ngIf='FeedAndChecknet'></app-feed-checknet>\n    <app-observations *ngIf=\"Observations\"></app-observations>\n    <app-water-medicine-report *ngIf='WaterAndMedicine'></app-water-medicine-report>\n    <app-count-harvest *ngIf='CountHarvest'></app-count-harvest>\n    <app-stock-stocking *ngIf='StockStocking'></app-stock-stocking>\n    <!-- <app-pond-prepartion *ngIf='pondPrepartionComponent'></app-pond-prepartion>\n    <app-cultivation-stage *ngIf='cultivationStage'></app-cultivation-stage> -->\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/feed-input/observations/observations.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/feed-input/observations/observations.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"main-content\">\n  <div class=\"container-fluid\"> -->\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n        <button type=\"button\" id=\"shrimpb1\" class=\"btn btn-info\" [ngClass]=\"['bntStyle']\"\n          (click)=\"loadShrimpObv();\" value=\"Feed\">Shrimp</button>\n      </div>\n      <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n        <button type=\"button\" id=\"waterb2\" class=\"btn btn-info\" \n        (click)=\"loadWaterObv();\">Water</button>\n      </div>\n    </div>\n    <hr>\n    <div class=\"row\">\n      <mat-radio-group class=\"example-radio-group\" name=\"fieldname\" \n      (change)=\"changeFeed($event)\"\n      [(ngModel)]=\"SelectedFeeds\" ngDefaultControl>\n      <mat-radio-button class=\"example-radio-button\" \n      *ngFor=\"let x of selectFeeds\" [value]=\"x\" style=\"margin:1rem;\">  {{ x }}\n      </mat-radio-button>\n    </mat-radio-group>\n    </div>\n    <hr>\n\n  <!-- Div for shrimp obv -->\n    <div class=\"row\" *ngIf=\"div_shrimp\">\n      <div class=\"col-md-12 offset-md-12\">\n        <form [formGroup]=\"shrimpobvform\" (ngSubmit)=\"onSubmit()\">\n          <div formArrayName=\"TankInput\" >\n            <table class=\"table table-responsive\">\n        <th>\n          <tbody>\n           <tr><input type=\"text\" value=\"Tank No\" readonly></tr>\n           <tr><input type=\"text\" value=\"No body Moulting\" readonly></tr>\n           <tr><input type=\"text\" value=\"No Head Moulting \" readonly></tr>\n         <tr><input type=\"text\" value=\"No Moulting\" readonly></tr>\n         <tr><input type=\"text\" value=\"No new shell formation\" readonly></tr>\n         <tr><input type=\"text\" value=\"Meesum cut Black\" readonly></tr>\n         <tr><input type=\"text\" value=\"Meesum cut\" readonly></tr>\n         <tr><input type=\"text\" value=\"Garuku Meesum\" readonly></tr>\n         <tr><input type=\"text\" value=\"Long Fecals\" readonly></tr>\n         <tr><input type=\"text\" value=\"Yellow Fecals\" readonly></tr>\n         <tr><input type=\"text\" value=\"White Fecals\" readonly></tr>\n         <tr><input type=\"text\" value=\"White gut\" readonly></tr>\n         <tr><input type=\"text\" value=\"Empty gut\" readonly></tr>\n         <tr><input type=\"text\" value=\"Plankton gut\" readonly></tr>\n         <tr><input type=\"text\" value=\"Soil gut\" readonly></tr>\n         <tr><input type=\"text\" value=\"Gap Gut\" readonly></tr>\n         <tr><input type=\"text\" value=\"Black Gill\" readonly></tr>\n         <tr><input type=\"text\" value=\"Brown Gill\" readonly></tr>\n         <tr><input type=\"text\" value=\"No Jiguru\" readonly></tr>\n         <tr><input type=\"text\" value=\"Size variation\" readonly></tr>\n         <tr><input type=\"text\" value=\"Toka Erupulu\" readonly></tr>\n         <tr><input type=\"text\" value=\"Kallu Erupulu\" readonly></tr>\n         <tr><input type=\"text\" value=\"Kidny Color change\" readonly></tr>\n         <tr><input type=\"text\" value=\"Head Water\" readonly></tr>\n         <tr><input type=\"text\" value=\"White Muscle\" readonly></tr>\n         <tr><input type=\"text\" value=\"Mineral Bends\" readonly></tr>\n         <tr><input type=\"text\" value=\"Gottuku Ravadam\" readonly></tr>\n         <tr><input type=\"text\" value=\"Paina Eedadam\" readonly></tr>\n         <tr><input type=\"text\" value=\"Body cracks\" readonly></tr>\n         <tr><input type=\"text\" value=\"Hatchery Bends\" readonly></tr>\n         <tr><input type=\"text\" value=\"Loose Shell\" readonly></tr>\n         <tr><input type=\"text\" value=\"Deads\" readonly></tr>\n         <tr><input type=\"text\" value=\"EPH\" readonly></tr>\n         <tr><input type=\"text\" value=\"Virus\" readonly></tr>\n         <tr><input type=\"text\" value=\"White Spot\" readonly></tr>\n         <tr><input type=\"text\" value=\"Potti Royya\" readonly></tr>\n         <tr><input type=\"text\" value=\"Snail\" readonly></tr>\n         <tr><input type=\"text\" value=\"Do\" readonly></tr>\n         <tr><input type=\"text\" value=\"Theegalu\" readonly></tr>\n         <tr><input type=\"text\" value=\"Chikkadanam\" readonly></tr>\n         <tr><input type=\"text\" value=\"Water crash\" readonly></tr>\n         <tr><input type=\"text\" value=\"Turbidity\" readonly></tr>\n         <tr><input type=\"text\" value=\"Water color\" readonly></tr>\n        </tbody>\n      </th>\n        <th *ngFor=\"let TankInput of shrimpobvform.get('TankInput')['controls'];\n        let i=index\">\n        <tbody [formGroupName]=\"i\">\n          <!-- <tr> {{i+1}}</tr> -->\n          <tr>  <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n          <tr><input type=\"number\" formControlName=\"no_body_moulting\" min=\"1\" max=\"5\"></tr>\n          <tr><input type=\"number\" formControlName=\"no_head_moulting\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"no_moulting\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"no_new_shell_formation\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"meesum_cut_black\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"meesum_cut\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"garuku_meesum\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"long_fecals\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"yellow_fecals\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"white_fecals\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"white_gut\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"empty_gut\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"plankton_gut\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"soil_gut\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"gap_gut\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"black_gill\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"brown_gill\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"no_jiguru\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"size_variation\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"toka_erupulu\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"kallu_erupulu\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"kidny_color_change\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"head_water\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"white_muscle\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"mineral_bends\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"gottuku_ravadam\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"paina_eedadam\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"body_cracks\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"hatchery_bends\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"loose_shell\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"deads\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"EPH\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"virus\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"white_spot\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"potti_royya\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"snail\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"do\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"theegalu\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"chikkadanam\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"water_crash\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"turbidity\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"water_color\" min=\"1\" max=\"5\"></tr>    \n        </tbody>\n        </th>\n      </table>\n        </div>\n        <div class=\"form-group\">\n          <button class=\"btn btn-primary\">Submit</button>\n      </div>\n        </form>\n          </div>\n    </div>\n<!-- water data -->\n <div class=\"card-deck row\" *ngIf=\"div_water\">\n      <form [formGroup]=\"waterobvform\" (ngSubmit)=\"onSubmitWater()\">\n        <div formArrayName=\"TankInput\" >\n          <table class=\"table table-responsive\">\n      <th>\n        <tbody>\n          <tr><input type=\"text\" value=\"Tank No\" readonly></tr>\n          <tr><input type=\"text\" value=\"No body Moulting\" readonly></tr>\n          <tr><input type=\"text\" value=\"No Head Moulting \" readonly></tr>\n        <tr><input type=\"text\" value=\"No Moulting\" readonly></tr>\n        <tr><input type=\"text\" value=\"No new shell formation\" readonly></tr>\n        <tr><input type=\"text\" value=\"Meesum cut Black\" readonly></tr>\n        <tr><input type=\"text\" value=\"Meesum cut\" readonly></tr>\n        <tr><input type=\"text\" value=\"Garuku Meesum\" readonly></tr>\n        <tr><input type=\"text\" value=\"Long Fecals\" readonly></tr>\n        <tr><input type=\"text\" value=\"Yellow Fecals\" readonly></tr>\n        <tr><input type=\"text\" value=\"White Fecals\" readonly></tr>\n        <tr><input type=\"text\" value=\"White gut\" readonly></tr>\n        <tr><input type=\"text\" value=\"Empty gut\" readonly></tr>\n        <tr><input type=\"text\" value=\"Plankton gut\" readonly></tr>\n        <tr><input type=\"text\" value=\"Soil gut\" readonly></tr>\n        <tr><input type=\"text\" value=\"Gap Gut\" readonly></tr>\n        <tr><input type=\"text\" value=\"Black Gill\" readonly></tr>\n        <tr><input type=\"text\" value=\"Brown Gill\" readonly></tr>\n        <tr><input type=\"text\" value=\"No Jiguru\" readonly></tr>\n        <tr><input type=\"text\" value=\"Size variation\" readonly></tr>\n        <tr><input type=\"text\" value=\"Toka Erupulu\" readonly></tr>\n        <tr><input type=\"text\" value=\"Kallu Erupulu\" readonly></tr>\n        <tr><input type=\"text\" value=\"Kidny Color change\" readonly></tr>\n        <tr><input type=\"text\" value=\"Head Water\" readonly></tr>\n        <tr><input type=\"text\" value=\"White Muscle\" readonly></tr>\n        <tr><input type=\"text\" value=\"Mineral Bends\" readonly></tr>\n        <tr><input type=\"text\" value=\"Gottuku Ravadam\" readonly></tr>\n        <tr><input type=\"text\" value=\"Paina Eedadam\" readonly></tr>\n        <tr><input type=\"text\" value=\"Body cracks\" readonly></tr>\n        <tr><input type=\"text\" value=\"Hatchery Bends\" readonly></tr>\n        <tr><input type=\"text\" value=\"Loose Shell\" readonly></tr>\n        <tr><input type=\"text\" value=\"Deads\" readonly></tr>\n        <tr><input type=\"text\" value=\"EPH\" readonly></tr>\n        <tr><input type=\"text\" value=\"Virus\" readonly></tr>\n        <tr><input type=\"text\" value=\"White Spot\" readonly></tr>\n        <tr><input type=\"text\" value=\"Potti Royya\" readonly></tr>\n        <tr><input type=\"text\" value=\"Snail\" readonly></tr>\n        <tr><input type=\"text\" value=\"Do\" readonly></tr>\n        <tr><input type=\"text\" value=\"Theegalu\" readonly></tr>\n        <tr><input type=\"text\" value=\"Chikkadanam\" readonly></tr>\n        <tr><input type=\"text\" value=\"Water crash\" readonly></tr>\n        <tr><input type=\"text\" value=\"Turbidity\" readonly></tr>\n        <tr><input type=\"text\" value=\"Water color\" readonly></tr>\n      </tbody>\n    </th>\n      <th *ngFor=\"let TankInput of waterobvform.get('TankInput')['controls'];\n      let i=index\">\n      <tbody [formGroupName]=\"i\">\n        <!-- <tr> {{i+1}}</tr> -->\n        <tr>  <input type=\"text\" formControlName=\"tank_name\" readonly></tr>\n        <tr><input type=\"number\" formControlName=\"no_body_moulting\" min=\"1\" max=\"5\"></tr>\n        <tr><input type=\"number\" formControlName=\"no_head_moulting\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"no_moulting\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"no_new_shell_formation\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"meesum_cut_black\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"meesum_cut\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"garuku_meesum\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"long_fecals\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"yellow_fecals\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"white_fecals\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"white_gut\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"empty_gut\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"plankton_gut\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"soil_gut\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"gap_gut\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"black_gill\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"brown_gill\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"no_jiguru\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"size_variation\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"toka_erupulu\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"kallu_erupulu\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"kidny_color_change\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"head_water\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"white_muscle\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"mineral_bends\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"gottuku_ravadam\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"paina_eedadam\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"body_cracks\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"hatchery_bends\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"loose_shell\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"deads\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"EPH\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"virus\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"white_spot\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"potti_royya\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"snail\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"do\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"theegalu\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"chikkadanam\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"water_crash\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"turbidity\" min=\"1\" max=\"5\"></tr>\n      <tr><input type=\"number\" formControlName=\"water_color\" min=\"1\" max=\"5\"></tr>  \n      </tbody>\n      </th>\n    </table>\n      </div>\n      <div class=\"form-group\">\n        <button class=\"btn btn-primary\">Submit</button>\n    </div>\n      </form>\n  </div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  stock-stocking works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/feed-input/water-medicine-report/water-medicine-report.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/feed-input/water-medicine-report/water-medicine-report.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"main-content\">\n  <div class=\"container-fluid\"> -->\n    <hr>\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n        <button type=\"button\" id=\"b1\" class=\"btn btn-info\" [ngClass]=\"['bntStyle']\"\n          (click)=\"loadWaterMedicine();\" value=\"Feed\">Water Medicine</button>\n      </div>\n      <div class=\"col-sm-6 col-md-6 col-lg-6 col-xl-6\">\n        <button type=\"button\" id=\"b2\" class=\"btn btn-info\" \n        (click)=\"loadWaterReport();\">Water Report</button>\n      </div>\n    </div>\n    <hr>\n    <div class=\"row\">\n      <mat-radio-group class=\"example-radio-group\" name=\"fieldname\" \n      (change)=\"changeFeed($event)\"\n      [(ngModel)]=\"SelectedFeeds\" ngDefaultControl>\n      <mat-radio-button class=\"example-radio-button\" \n      *ngFor=\"let x of selectFeeds\" [value]=\"x\" style=\"margin:1rem;\">  {{ x }}\n      </mat-radio-button>\n    </mat-radio-group>\n    </div>\n    <hr>\n    <!-- <div class=\"card-deck row\">\n      <form [formGroup]=\"watermedicineform\" (ngSubmit)=\"onSubmit()\">\n        <div formArrayName=\"TankInput\" >\n      <th *ngFor=\"let TankInput of watermedicineform.get('TankInput')['controls'];\n      let i=index\">\n      <tbody [formGroupName]=\"i\">\n        <tr> {{i+1}}</tr>\n        <tr>  <input type=\"text\" formControlName=\"tank_name\"  class=\"form-control\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"code\"  class=\"form-control\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"quantity_kg\"  class=\"form-control\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"cn_gm_kg\"  class=\"form-control\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"cn_gm\"  class=\"form-control\"></tr>\n      </tbody>\n      </th>\n      </div>\n      </form>\n  </div> -->\n    <div class=\"row\" *ngIf=\"div_Water_medicine\">\n      <div class=\"col-md-12 offset-md-12\">\n          <form [formGroup]=\"watermedicineform\" (ngSubmit)=\"onSubmit()\">\n              <div formArrayName=\"TankInput\" >\n                  <!-- <div *ngFor=\"let TankInput of watermedicineform.get('TankInput')['controls'];\n                  let i=index\" class=\"col-md-4 \" style=\"display:flex;\">\n                      <div [formGroupName]=\"i\">\n                        <div>\n                          <label>TankName</label>\n                          <input type=\"text\" formControlName=\"tank_name\"  class=\"form-control\">\n                      </div>\n                          <div>\n                            <label>Time</label>\n                            <input type=\"text\" formControlName=\"time\"  class=\"form-control\">\n                        </div>\n                         <div>\n                            <label>Code</label>\n                            <input type=\"text\" formControlName=\"code\"  class=\"form-control\">\n                        </div>\n                        <div>\n                          <label>Quantity </label>\n                          <input type=\"text\" formControlName=\"quantity\"  class=\"form-control\">\n                      </div>\n                      </div>\n                  </div> -->\n                  <div>\n                    <table class=\"table table-responsive\" style=\"padding: 0%;\">\n                      <tr>\n                        <tbody>\n                        <th><input type=\"text\" value=\"Tank name\" readonly></th>\n                        <th><input type=\"text\" value=\"Time\" readonly></th>\n                        <th><input type=\"text\" value=\"Code\" readonly></th>\n                        <th><input type=\"text\" value=\"Quantity\" readonly></th>\n                      </tbody>\n                      </tr>\n                      <tr *ngFor=\"let TankInput of watermedicineform.get('TankInput')['controls'];\n                      let i=index\">\n                        <tbody [formGroupName]=\"i\">\n                          <th><input type=\"text\" formControlName=\"tank_name\" readonly></th>\n                          <th><input type=\"text\" formControlName=\"time\"></th>\n                          <th><input type=\"text\" formControlName=\"code\"></th>\n                          <th><input type=\"text\" formControlName=\"quantity\"></th>\n                        </tbody>\n                      </tr>\n                    </table>\n                  </div>\n              </div>\n                <hr>\n              <div class=\"form-group\">\n                  <button class=\"btn btn-primary\">Submit</button>\n              </div>\n          </form>\n          </div>\n    </div>\n<!-- Checknets data -->\n <div class=\"card-deck row\" *ngIf=\"div_water_report\">\n      <form [formGroup]=\"waterreportform\" (ngSubmit)=\"onSubmitWaterReport()\">\n        <div formArrayName=\"TankInput\" >\n          <table class=\"table table-responsive\">\n      <th>\n        <tbody>\n         <tr><input type=\"text\" value=\"Tank No/Bore No\" readonly></tr>\n         <tr><input type=\"text\" value=\"Salinty\" readonly></tr>\n         <tr><input type=\"text\" value=\"Alkalinity \" readonly></tr>\n       <tr><input type=\"text\" value=\"Hardness\" readonly></tr>\n       <tr><input type=\"text\" value=\"Ammonia\" readonly></tr>\n       <tr><input type=\"text\" value=\"Calcium\" readonly></tr>\n       <tr><input type=\"text\" value=\"Magnesium\" readonly></tr>\n       <tr><input type=\"text\" value=\"Potassium\" readonly></tr>\n       <tr><input type=\"text\" value=\"Phosphate\" readonly></tr>\n       <tr><input type=\"text\" value=\"Chlorine\" readonly></tr>\n       <tr><input type=\"text\" value=\"Fluoride\" readonly></tr>\n       <tr><input type=\"text\" value=\"Iron\" readonly></tr>\n       <tr><input type=\"text\" value=\"Nitrite\" readonly></tr>\n       <tr><input type=\"text\" value=\"Nitrate\" readonly></tr>\n       <tr><input type=\"text\" value=\"Turbidity\" readonly></tr>\n       <tr><input type=\"text\" value=\"Green\" readonly></tr>\n       <tr><input type=\"text\" value=\"Yellow\" readonly></tr>\n       <tr><input type=\"text\" value=\"Do Am\" readonly></tr>\n       <tr><input type=\"text\" value=\"Do Noon\" readonly></tr>\n       <tr><input type=\"text\" value=\"Do Pm\" readonly></tr>\n       <tr><input type=\"text\" value=\"Ph Am\" readonly></tr>\n       <tr><input type=\"text\" value=\"Ph Noon\" readonly></tr>\n       <tr><input type=\"text\" value=\"Ph Pm\" readonly></tr>\n      </tbody>\n    </th>\n      <th *ngFor=\"let TankInput of waterreportform.get('TankInput')['controls'];\n      let i=index\">\n      <tbody [formGroupName]=\"i\">\n        <!-- <tr> {{i+1}}</tr> -->\n        <tr>  <input type=\"text\" formControlName=\"tank_name\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"salinity\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"alkality\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"hardness\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"ammonia\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"calcium\" ></tr>\n        <tr>  <input type=\"text\" formControlName=\"magnesium\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"potassium\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"phosphate\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"chlorine\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"fluoride\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"iron\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"nitrite\"  ></tr>\n        <tr>  <input type=\"text\" formControlName=\"nitrate\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"turbidity\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"green\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"yellow\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"do_am\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"do_noon\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"do_pm\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"ph_am\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"ph_noon\"></tr>\n        <tr>  <input type=\"text\" formControlName=\"ph_pm\"></tr>\n      </tbody>\n      </th>\n    </table>\n      </div>\n      <div class=\"form-group\">\n        <button class=\"btn btn-primary\">Submit</button>\n    </div>\n      </form>\n  </div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/inspections/inspections.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/inspections/inspections.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"container-fluid\">\n    <div class=\"table-responsive\">\n      <table class=\"table\">\n        <thead class=\"thead-dark\">\n          <tr>\n            <th scope=\"col\">Business  Name</th>\n            <th scope=\"col\">Certificate_number</th>\n            <th scope=\"col\">Result</th>\n            <th scope=\"col\">Date</th>\n\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let x of inspections?.posts\">\n            <td>{{x.business_name}}</td>\n            <td>{{x.certificate_number}}</td>\n            <td>{{x.result}}</td>\n            <td>{{x.date}}</td>\n          </tr>\n        </tbody>\n      </table>\n      <div class=\"pagination-controls\">\n        <pagination-controls (pageChange)=\"p = $event\"></pagination-controls>\n      </div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pond-prepartion/pond-prepartion.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pond-prepartion/pond-prepartion.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<hr>\n  <!-- <span>Pond Preparation Stage:</span> -->\n  <span>Select :</span>\n\n<div class=\"row\">\n  <mat-radio-group class=\"example-radio-group\" name=\"fieldname\" (change)=\"ChangePondStage($event)\"\n    [(ngModel)]=\"SelectedPondInputs\" ngDefaultControl>\n    <mat-radio-button class=\"example-radio-button\" *ngFor=\"let x of selectPondInputs\" [value]=\"x\">\n      {{x}}\n    </mat-radio-button>\n  </mat-radio-group>\n</div>\n<hr>\n<div class=\"input-container\">\n  <div class=\"example-selected-value\">{{SelectedPondInputs}}</div>\n<div *ngIf=\"SelectedPondInputs=='Add Medicine'\">\n  <form (submit)=\"postAddMedicine(AddMedicine)\" #AddMedicine=\"ngForm\">\n    <div class=\"row\">\n      <div class=\" col-md-3\">\n        <label for=\"farmOwner\">Select Farm</label>\n        <select  id=\"farmOwner\" class=\"form-control\" \n        ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n          <option ng-value=\"\">Select Farm </option>\n          <option *ngFor=\"let farm of postsFarmOwner\" \n          ng-value=\"farm.firstName\">{{farm.firstName}} {{farm.lastName}}</option>\n        </select>\n      </div>\n       <div class=\" col-md-3\">\n        <label for=\"selectTank\">Select Tanks</label>\n        <select class=\"form-control\" \n        ngModel name=\"selectTank\" #selectTank=\"ngModel\" required>\n          <option value=\"\">Select Tanks</option>\n          <option *ngFor=\"let tanks of selectTanks\" [value]=\"tanks\">{{tanks}}</option>\n        </select>\n      </div>\n      <div class=\" col-md-3\" >\n        <label for=\"selectMedicine\">Select Medicine</label>\n        <select class=\"form-control\" \n        ngModel name=\"selectMedicine\" #selectMedicine=\"ngModel\" required> \n          <option value=\"\">Select Medicine</option>\n          <option *ngFor=\"let medicine of selectMedicines\" [value]=\"medicine\">{{medicine}}</option>\n        </select>\n      </div>\n      <div class=\" col-md-3\" >\n        <label for=\"dosage\">Enter Dosage</label>\n        <input type=\"number\" class=\"form-control\" \n        ngModel name=\"dosage\" #dosage=\"ngModel\" placeholder=\"Enter Dosage \" id=\"enterDosage\" min=\"0\" required>\n      </div>\n    </div>\n    <hr>\n    <button type=\"submit\" class=\"btn btn-primary float-right\" [disabled]=\"!AddMedicine.valid\">Submit</button>\n  </form>\n</div>\n<div *ngIf=\"SelectedPondInputs=='Add Water Report'\">\n  <form (submit)=\"postAddWaterReport(AddWaterReport)\" #AddWaterReport=\"ngForm\">\n    <div class=\"row\">\n      <div class=\" col-md-3\">\n        <label for=\"farmOwner\">Select Farm</label>\n        <select  id=\"farmOwner\" class=\"form-control\" \n        ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n          <option ng-value=\"\">Select Farm </option>\n          <option *ngFor=\"let farm of postsFarmOwner\" \n          ng-value=\"farm.firstName\">{{farm.firstName}} {{farm.lastName}}</option>\n        </select>\n      </div>\n      <div class=\" col-md-3\">\n        <label for=\"selectTank\">Select Tanks</label>\n        <select class=\"form-control\" \n        ngModel name=\"selectTank\" #selectTank=\"ngModel\" required>\n          <option value=\"\">Select Tanks</option>\n          <option *ngFor=\"let tanks of selectTanks\" [value]=\"tanks\">{{tanks}}</option>\n        </select>\n      </div>\n      <div class=\" col-md-3\" >\n        <label for=\"selectTime\">Check AM|PM </label>\n        <input id=\"appt-time\" class=\"form-control\" type=\"time\"\n        ngModel name=\"selectTime\" #selectTime=\"ngModel\"  value=\"13:30\" required>\n      </div>\n      <div class=\" col-md-3\" >\n        <label for=\"selectPH\">Add Ph|Turbicity </label>\n        <input type=\"number\" class=\"form-control\"\n        ngModel name=\"selectPH\" #selectPH=\"ngModel\" placeholder=\"Enter Ph|Turbicity \" id=\"addPH\" required>\n      </div>\n    </div>\n    <hr>\n    <button type=\"submit\" [disabled]=\"!AddWaterReport.valid\" class=\"btn btn-primary float-right\">Submit</button>\n  </form>\n</div>\n<div *ngIf=\"SelectedPondInputs=='Add Picture'\">\n  <form (submit)=\"postAddPicture(AddPicture)\" #AddPicture=\"ngForm\">\n    <div class=\"row\">\n      <div class=\" col-md-4\">\n        <span >Select Farm</span>\n        <select  id=\"farmOwner\" class=\"form-control\" \n        ngModel name=\"farmOwner\" #farmOwner=\"ngModel\" required>\n          <option ng-value=\"\">Select Farm </option>\n          <option *ngFor=\"let farm of postsFarmOwner\" \n          ng-value=\"farm.firstName\">{{farm.firstName}} {{farm.lastName}}</option>\n        </select>\n      </div>\n      <div class=\" col-md-4\">\n        <span>Select Tanks</span>\n        <select class=\"form-control\" \n        ngModel name=\"selectTank\" #selectTank=\"ngModel\" required>\n          <option value=\"\">Select Tanks</option>\n          <option *ngFor=\"let tanks of selectTanks\" [value]=\"tanks\">{{tanks}}</option>\n        </select>\n      </div>\n      <div class=\" col-md-4\" >\n        <label for=\"addFile\">Add Picture</label>\n        <div class=\"file-upload-wrapper\">\n          <input type=\"file\" id=\"input-file-now-custom-2\" \n          ngModel name=\"addFile\" #addFile=\"ngModel\" class=\"file-upload\"\n         data-height=\"500\" required/>\n       </div>\n      </div>\n     \n    </div>\n    <hr>\n    <button type=\"submit\" [disabled]=\"!AddPicture.valid\" class=\"btn btn-primary float-right\">Submit</button>\n  </form>\n</div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/registration/registration.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/registration/registration.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"container-fluid\">\n    <form (submit)=\"postFarmOwner(addFarmOwner)\" #addFarmOwner=\"ngForm\">\n      <div class=\"form-row\">\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"firstName\">First name</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"firstName\"\n          ngModel name=\"firstName\" #firstName=\"ngModel\"  placeholder=\"Enter First name\"\n            required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"lastName\">Last name</label>\n          <input type=\"text\" class=\"form-control is-valid\"\n          id=\"lastName\" ngModel name=\"lastName\" #lastName=\"ngModel\"\n            placeholder=\"Enter Last name\"\n            required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"mobile\">Mobile</label>\n          <input type=\"number\" class=\"form-control is-valid\" \n          id=\"mobile\"\n          ngModel name=\"mobile\" #mobile=\"ngModel\" placeholder=\"Enter Mobile No\"\n            required>\n\n        </div>\n      </div>\n      <!-- <div class=\"form-row\">\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"address\">Address</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"address\"  \n          ngModel name=\"address\" #address=\"ngModel\" placeholder=\"Enter Address\" required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"referral\">Referral</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"referral\" \n          ngModel name=\"referral\" #referral=\"ngModel\" placeholder=\"Enter referral\" required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"pan\">PAN No</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"pan\" \n          ngModel name=\"pan\" #pan=\"ngModel\"\n          placeholder=\"Enter PAN No\" required>\n\n        </div>\n      </div>\n      <div class=\"form-row\">\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"adhaar\">Adhaar No</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"adhaar\" \n          ngModel name=\"adhaar\" #adhaar=\"ngModel\" placeholder=\"Enter Adhaar\" required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"panFile\">Upload PAN</label>\n          <input type=\"file\" class=\"form-control-file is-valid\" id=\"panFile\"\n          ngModel name=\"panFile\" #panFile=\"ngModel\" placeholder=\"Upload PAN\" required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"adhaarFile\">Upload Adhaar</label>\n          <input type=\"file\" class=\"form-control-file is-valid\" id=\"adhaarFile\" \n          ngModel name=\"adhaarFile\" #adhaarFile=\"ngModel\"  placeholder=\"Upload Adhaar\" required>\n        </div>\n      </div>\n      <div class=\"form-row\">\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"companyName\">Company Name</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"companyName\" \n          ngModel name=\"companyName\" #companyName=\"ngModel\"\n          placeholder=\"Enter companyName\" required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"companyPan\">Company PAN No</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"companyPan\"\n          ngModel name=\"companyPan\" #companyPan=\"ngModel\"\n          placeholder=\"Enter Company PAN  No\" required>\n\n        </div>\n        <div class=\"col-md-4 mb-3\">\n          <label for=\"companyAdhaar\">Company Adhaar No</label>\n          <input type=\"text\" class=\"form-control is-valid\" id=\"companyAdhaar\" \n          ngModel name=\"companyAdhaar\" #companyAdhaar=\"ngModel\"\n          placeholder=\"Enter companyAdhaar\" required>\n\n        </div>\n      </div>\n        <div class=\"form-row\">\n          <div class=\"col-md-4 mb-3\">\n            <label for=\"companyGstNo\">GST No</label>\n            <input type=\"text\" class=\"form-control is-valid\" id=\"companyGstNo\"\n            ngModel name=\"companyGstNo\" #companyGstNo=\"ngModel\"\n            placeholder=\"Enter Company GST No\" required>\n  \n          </div>\n          <div class=\"col-md-4 mb-3\">\n            <label for=\"companyPanFile\">Upload Company PAN</label>\n            <input type=\"file\" class=\"form-control-file is-valid\" id=\"companyPanFile\"\n            ngModel name=\"companyPanFile\" #companyPanFile=\"ngModel\"\n            placeholder=\"Upload Company PAN\" required>\n  \n          </div>\n          <div class=\"col-md-4 mb-3\">\n            <label for=\"companyAdhaarFile\">Upload Company Adhaar</label>\n            <input type=\"file\" class=\"form-control-file is-valid\" id=\"companyAdhaarFile\" \n            ngModel name=\"companyAdhaarFile\" #companyAdhaarFile=\"ngModel\"\n            placeholder=\"Upload Adhaar\" required>\n          </div>\n          </div> -->\n      <button class=\"btn btn-primary\" type=\"submit\"  [disabled]=\"!addFarmOwner.valid\">Register Owner</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/add-farm/add-farm.component.scss":
/*!**************************************************!*\
  !*** ./src/app/add-farm/add-farm.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-spinner {\n  margin: auto;\n}\n\nmat-paginator {\n  margin: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkLWZhcm0vRTpcXFRoaW5rVGFua2Vyc1xcU2hyaW1wXFxmcm9udGVuZC9zcmNcXGFwcFxcYWRkLWZhcm1cXGFkZC1mYXJtLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hZGQtZmFybS9hZGQtZmFybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUNDSjs7QURDRTtFQUNJLFlBQUE7QUNFTiIsImZpbGUiOiJzcmMvYXBwL2FkZC1mYXJtL2FkZC1mYXJtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LXNwaW5uZXIge1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxuICBtYXQtcGFnaW5hdG9ye1xyXG4gICAgICBtYXJnaW46IDFyZW07XHJcbiAgfSIsIm1hdC1zcGlubmVyIHtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG5tYXQtcGFnaW5hdG9yIHtcbiAgbWFyZ2luOiAxcmVtO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/add-farm/add-farm.component.ts":
/*!************************************************!*\
  !*** ./src/app/add-farm/add-farm.component.ts ***!
  \************************************************/
/*! exports provided: AddFarmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFarmComponent", function() { return AddFarmComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
/* harmony import */ var app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/add-farm-owner.service */ "./src/app/services/add-farm-owner.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddFarmComponent = /** @class */ (function () {
    function AddFarmComponent(AddFarmService, addFarmOwnerService, router) {
        this.AddFarmService = AddFarmService;
        this.addFarmOwnerService = addFarmOwnerService;
        this.router = router;
        // newFarmData={};
        this.posts = [];
        this.postsOwner = [];
        this.farmOwnerData = [];
        this.farmData = [];
        this.isLoading = false;
        //dynamic button
        this.fieldArray = [{}];
        this.newAttribute1 = {
            'tank_name': '',
            'tank_area': ''
        };
        this.firstField1 = true;
        this.firstFieldName1 = 'First Item name';
    }
    AddFarmComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
        this.readFarmOwner();
        this.readFarm_details();
    };
    //read farm owner
    AddFarmComponent.prototype.readFarmOwner = function () {
        var _this = this;
        this.addFarmOwnerService.getFarmOwner().subscribe(function (data) {
            _this.farmOwnerData = data;
            console.log(data);
        });
    };
    //read farm
    AddFarmComponent.prototype.readFarm_details = function () {
        var _this = this;
        this.AddFarmService.getFarm().subscribe(function (data) {
            _this.farmData = data;
            console.log(data);
        });
    };
    AddFarmComponent.prototype.addFieldValue1 = function (index) {
        if (this.fieldArray.length <= 10) {
            this.fieldArray.push(this.newAttribute1);
            // this.newAttribute1 = {
            //   'tank_name':'',
            //   'tank_area':''
            // };
            console.log(this.fieldArray);
        }
        else {
        }
    };
    AddFarmComponent.prototype.deleteFieldValue1 = function (index) {
        this.fieldArray.splice(index, 1);
    };
    AddFarmComponent.prototype.dataChanged = function (noOfTanks) {
        // console.log(noOfTanks.value);
        this.tankValue = noOfTanks.value;
        // console.log(this.tankValue);
        this.fieldArray = [];
        for (var i = 0; i < this.tankValue; i++) {
            this.fieldArray.push(this.newAttribute1);
            // console.log('hi');
            this.newAttribute1 = {};
        }
    };
    //ends
    AddFarmComponent.prototype.postFarm = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        console.log(form.value);
        // console.log(form.value.fieldArray);
        // return;
        console.log(this.fieldArray);
        this.AddFarmService.postFarm(form.value.farmOwner, form.value.farmHistory, form.value.village, form.value.mandal, form.value.city, form.value.state, form.value.zip, form.value.country, form.value.noOfTanks, form.value.noOfEmployess, form.value.tankCode, this.fieldArray);
        alert("Farm Saved Sucessfully");
        form.reset();
        document.getElementById('addFarm').click();
    };
    //delete query
    AddFarmComponent.prototype.onDelete = function (postId) {
        var x = confirm("Are You Sure ? Do you wan to delete ");
        console.log(x);
        if (x == true) {
            this.AddFarmService.deleteFarm(postId);
            console.log(postId);
        }
        else {
            return;
        }
    };
    AddFarmComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-farm',
            template: __webpack_require__(/*! raw-loader!./add-farm.component.html */ "./node_modules/raw-loader/index.js!./src/app/add-farm/add-farm.component.html"),
            styles: [__webpack_require__(/*! ./add-farm.component.scss */ "./src/app/add-farm/add-farm.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__["AddFarmService"], app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_2__["AddFarmOwnerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AddFarmComponent);
    return AddFarmComponent;
}());



/***/ }),

/***/ "./src/app/customers-data/customers-data.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/customers-data/customers-data.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N1c3RvbWVycy1kYXRhL2N1c3RvbWVycy1kYXRhLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/customers-data/customers-data.component.ts":
/*!************************************************************!*\
  !*** ./src/app/customers-data/customers-data.component.ts ***!
  \************************************************************/
/*! exports provided: CustomersDataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersDataComponent", function() { return CustomersDataComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CustomersDataComponent = /** @class */ (function () {
    function CustomersDataComponent(AddFarmService) {
        this.AddFarmService = AddFarmService;
    }
    CustomersDataComponent.prototype.ngOnInit = function () {
        this.getCustomer();
    };
    CustomersDataComponent.prototype.getCustomer = function () {
        var _this = this;
        this.AddFarmService.getCustoemrs().subscribe((function (data) {
            _this.customerData = data;
            console.log(data);
        }));
    };
    CustomersDataComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customers-data',
            template: __webpack_require__(/*! raw-loader!./customers-data.component.html */ "./node_modules/raw-loader/index.js!./src/app/customers-data/customers-data.component.html"),
            styles: [__webpack_require__(/*! ./customers-data.component.scss */ "./src/app/customers-data/customers-data.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__["AddFarmService"]])
    ], CustomersDataComponent);
    return CustomersDataComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chartist */ "./node_modules/chartist/dist/chartist.js");
/* harmony import */ var chartist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chartist__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.startAnimationForLineChart = function (chart) {
        var seq, delays, durations;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: chartist__WEBPACK_IMPORTED_MODULE_1__["Svg"].Easing.easeOutQuint
                    }
                });
            }
            else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });
        seq = 0;
    };
    ;
    DashboardComponent.prototype.startAnimationForBarChart = function (chart) {
        var seq2, delays2, durations2;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });
        seq2 = 0;
    };
    ;
    DashboardComponent.prototype.ngOnInit = function () {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
        var dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };
        var optionsDailySalesChart = {
            lineSmooth: chartist__WEBPACK_IMPORTED_MODULE_1__["Interpolation"].cardinal({
                tension: 0
            }),
            low: 0,
            high: 50,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };
        var dailySalesChart = new chartist__WEBPACK_IMPORTED_MODULE_1__["Line"]('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);
        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
        var dataCompletedTasksChart = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };
        var optionsCompletedTasksChart = {
            lineSmooth: chartist__WEBPACK_IMPORTED_MODULE_1__["Interpolation"].cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        };
        var completedTasksChart = new chartist__WEBPACK_IMPORTED_MODULE_1__["Line"]('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);
        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
        var datawebsiteViewsChart = {
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
            ]
        };
        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
        ];
        var websiteViewsChart = new chartist__WEBPACK_IMPORTED_MODULE_1__["Bar"]('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlZWQtaW5wdXQvY291bnQtaGFydmVzdC9jb3VudC1oYXJ2ZXN0L2NvdW50LWhhcnZlc3QuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.ts ***!
  \***********************************************************************************/
/*! exports provided: CountHarvestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountHarvestComponent", function() { return CountHarvestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/feed-input.service */ "./src/app/services/feed-input.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CountHarvestComponent = /** @class */ (function () {
    function CountHarvestComponent(route, _inputFeed, _addFarmService, formBuilder) {
        this.route = route;
        this._inputFeed = _inputFeed;
        this._addFarmService = _addFarmService;
        this.formBuilder = formBuilder;
        this.countFormData = false;
        this.harvestFormData = false;
        this.halfHarvestFormData = false;
        this.fullHarvestFormData = false;
        this.farmData = [];
        this.submitted = false;
        this.farmFetchedById = [];
    }
    CountHarvestComponent.prototype.ngOnInit = function () {
        this.farm_Id = this.route.snapshot.params.farmId;
        this.farm_Date = this.route.snapshot.params.farmDate;
        this.getFarmData();
        this.countForm = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            createdAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            inputType: ['Count', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            // selectedFeeds: ['', Validators.required],
            TankInput: this.formBuilder.array([
                this.initResponseCount(),
            ]),
            CountObservations: this.formBuilder.array([
                this.initResponseCountObservations(),
            ]),
            CountReport: this.formBuilder.array([
                this.initCountReport(),
            ])
        });
        this.halfharvestform = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            createdAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            inputType: ['Count', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            // selectedFeeds: ['', Validators.required],
            TankInput: this.formBuilder.array([
                this.initResponse(),
            ])
        });
        this.fullharvestForm = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            createdAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            inputType: ['Count', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            // selectedFeeds: ['', Validators.required],
            TankInput: this.formBuilder.array([
                this.initResponse(),
            ])
        });
    };
    CountHarvestComponent.prototype.loadCount = function () {
        document.getElementById("count").style.background = "green";
        document.getElementById("harvest").style.background = "";
        this.countFormData = true;
        this.harvestFormData = false;
    };
    CountHarvestComponent.prototype.loadHarvest = function () {
        document.getElementById("count").style.background = "";
        document.getElementById("harvest").style.background = "green";
        this.harvestFormData = true;
        this.countFormData = false;
    };
    CountHarvestComponent.prototype.halfHarvest = function () {
        document.getElementById("halfHarvest").style.background = "green";
        document.getElementById("fullHarvest").style.background = "";
        this.halfHarvestFormData = true;
        this.fullHarvestFormData = false;
    };
    CountHarvestComponent.prototype.fullHarvest = function () {
        document.getElementById("halfHarvest").style.background = "";
        document.getElementById("fullHarvest").style.background = "green";
        this.halfHarvestFormData = false;
        this.fullHarvestFormData = true;
    };
    CountHarvestComponent.prototype.getFarmData = function () {
        var _this = this;
        this._addFarmService.getFarm().subscribe(function (data) {
            _this.farmData = data['posts'];
            _this.farmFetchedById = _this.farmData.filter(function (x) { return x.farmId === _this.farm_Id; });
            _this.responseData = _this.farmFetchedById[0].tankArea;
            _this.countForm.setControl('TankInput', _this.setResponse1(_this.responseData));
            _this.countForm.setControl('CountObservations', _this.setResponse2(_this.responseData));
            _this.countForm.setControl('CountReport', _this.setResponse3(_this.responseData));
            _this.halfharvestform.setControl('TankInput', _this.setResponse(_this.responseData));
            _this.halfharvestform.setControl('CountObservations', _this.setResponse2(_this.responseData));
            _this.halfharvestform.setControl('CountReport', _this.setResponse3(_this.responseData));
            _this.fullharvestForm.setControl('TankInput', _this.setResponse(_this.responseData));
            _this.fullharvestForm.setControl('CountObservations', _this.setResponse2(_this.responseData));
            _this.fullharvestForm.setControl('CountReport', _this.setResponse3(_this.responseData));
        });
    };
    CountHarvestComponent.prototype.addcountsform = function () {
        // add  to the list
        var control = this.countForm.get('TankInput');
        control.push(this.initResponseCount());
    };
    //add dynamic count array
    CountHarvestComponent.prototype.initResponseCount = function () {
        return this.formBuilder.group({
            count: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            count_gms: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            kg_net: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            roopchand_count: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            neeting_side: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            first_feed_time: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            neeting_time: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            tank_name: [''],
            tank_area: [''],
        });
    };
    ;
    CountHarvestComponent.prototype.addharvestform = function () {
        // add  to the list
        var control = this.halfharvestform.get('TankInput');
        control.push(this.initResponse());
    };
    CountHarvestComponent.prototype.setResponse1 = function (responseSet) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]);
        responseSet.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                count: s.count,
                count_gms: s.harvest_kgs,
                kg_net: s.harvest_price,
                roopchand_count: s.loose_shell_kg,
                neeting_side: s.neeting_side,
                first_feed_time: s.first_feed_time,
                neeting_time: s.neeting_time,
                tank_area: s.tank_area,
                tank_name: s.tank_name,
            }));
        });
        return formArray;
    };
    //add dynamic Harvest array
    CountHarvestComponent.prototype.initResponse = function () {
        return this.formBuilder.group({
            count: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            harvest_kgs: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            harvest_price: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            loose_shell_kg: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            loose_shell_price: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            middleman: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            tank_name: [''],
            tank_area: [''],
        });
    };
    ;
    CountHarvestComponent.prototype.setResponse = function (responseSet) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]);
        responseSet.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                count: s.count,
                harvest_kgs: s.harvest_kgs,
                harvest_price: s.harvest_price,
                loose_shell_kg: s.loose_shell_kg,
                loose_shell_price: s.loose_shell_price,
                middleman: s.middleman,
                tank_area: s.tank_area,
                tank_name: s.tank_name,
            }));
        });
        return formArray;
    };
    //count observation dynamic form
    CountHarvestComponent.prototype.addcountformObv = function () {
        // add  to the list
        var control1 = this.countForm.get('CountObservations');
        control1.push(this.initResponseCountObservations());
    };
    //count Report dynamic form
    CountHarvestComponent.prototype.addcountformReport = function () {
        // add  to the list
        var control1 = this.countForm.get('CountReport');
        control1.push(this.initCountReport());
    };
    //count report 
    CountHarvestComponent.prototype.initCountReport = function () {
        return this.formBuilder.group({
            tank_name: [''],
            report: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            tank_area: [''],
        });
    };
    CountHarvestComponent.prototype.setResponse3 = function (responseSet) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]);
        responseSet.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                count: s.count,
                report: s.report,
                tank_area: s.tank_area,
                tank_name: s.tank_name,
            }));
        });
        return formArray;
    };
    //add dynamic Harvest array
    CountHarvestComponent.prototype.initResponseCountObservations = function () {
        return this.formBuilder.group({
            no_body_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            no_head_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            no_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            no_new_shell_formation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            meesum_cut_black: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            meesum_cut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            garuku_meesum: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            long_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            yellow_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            white_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            white_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            tank_name: [''],
            tank_area: [''],
            empty_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            plankton_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            soil_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            gap_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            black_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            brown_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            no_jiguru: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            size_variation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            toka_erupulu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            kallu_erupulu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            kallu_pakudu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            kidney_color_change: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            head_water: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            white_muscle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            minerial_bends: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            gottuku_ravadam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            paina_eedadam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            body_cracks: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            hatchery_bends: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            loose_shell: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            deads: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            potti_royya: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            snail: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            theegalu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            chikkadanam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            water_crash: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            turbidity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            water_color: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
    };
    ;
    CountHarvestComponent.prototype.setResponse2 = function (responseSet2) {
        var _this = this;
        var formArray1 = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]);
        responseSet2.forEach(function (s) {
            formArray1.push(_this.formBuilder.group({
                tank_area: s.tank_area,
                tank_name: s.tank_name,
                no_body_moulting: s.no_body_moulting,
                no_head_moulting: s.no_head_moulting,
                no_moulting: s.no_moulting,
                no_new_shell_formation: s.no_new_shell_formation,
                meesum_cut_black: s.meesum_cut_black,
                meesum_cut: s.meesum_cut,
                garuku_meesum: s.garuku_meesum,
                long_fecals: s.long_fecals,
                yellow_fecals: s.yellow_fecals,
                white_fecals: s.white_fecals,
                white_gut: s.white_gut,
                empty_gut: s.empty_gut,
                plankton_gut: s.plankton_gut,
                soil_gut: s.soil_gut,
                gap_gut: s.gap_gut,
                black_gill: s.black_gill,
                brown_gill: s.brown_gill,
                no_jiguru: s.no_jiguru,
                size_variation: s.size_variation,
                toka_erupulu: s.toka_erupulu,
                kallu_erupulu: s.kallu_erupulu,
                kallu_pakudu: s.kallu_pakudu,
                kidney_color_change: s.kidney_color_change,
                head_water: s.head_water,
                white_muscle: s.white_muscle,
                minerial_bends: s.minerial_bends,
                gottuku_ravadam: s.gottuku_ravadam,
                paina_eedadam: s.paina_eedadam,
                body_cracks: s.body_cracks,
                hatchery_bends: s.hatchery_bends,
                loose_shell: s.loose_shell,
                deads: s.deads,
                potti_royya: s.potti_royya,
                snail: s.snail,
                theegalu: s.theegalu,
                chikkadanam: s.chikkadanam,
                water_crash: s.water_crash,
                turbidity: s.turbidity,
                water_color: s.water_color,
            }));
        });
        return formArray1;
    };
    //submit form
    CountHarvestComponent.prototype.onSubmitcountForm = function () {
        this.submitted = true;
        console.log(this.countForm.value);
        if (!this.countForm.valid) {
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createCount(this.countForm.value)
                    .subscribe(function (res) {
                    if (res) {
                        alert('Count added Successfully');
                    }
                }, function (error) {
                    console.log(error);
                    if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpErrorResponse"]) {
                        if (error.status === 409 || error.status === 500) {
                            alert('Already Exist');
                        }
                        else {
                            alert('internal error occured');
                        }
                    }
                    else {
                        alert('internal error occured without any http error');
                    }
                });
            }
        }
    };
    //submit half form
    CountHarvestComponent.prototype.onSubmitharvestForm = function () {
        this.submitted = true;
        console.log(this.halfharvestform.value);
        if (!this.halfharvestform.valid) {
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createHalfHarvest(this.halfharvestform.value)
                    .subscribe(function (res) {
                    alert('Partial Harvest added Successfully');
                }, function (error) {
                    console.log(error);
                });
            }
        }
    };
    // full harvesrt
    //submit form
    CountHarvestComponent.prototype.onSubmitFullharvestForm = function () {
        this.submitted = true;
        console.log(this.fullharvestForm.value);
        if (!this.fullharvestForm.valid) {
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createFullHarvest(this.fullharvestForm.value)
                    .subscribe(function (res) {
                    alert('Full Harvest added Successfully');
                }, function (error) {
                    console.log(error);
                });
            }
        }
    };
    CountHarvestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-count-harvest',
            template: __webpack_require__(/*! raw-loader!./count-harvest.component.html */ "./node_modules/raw-loader/index.js!./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.html"),
            styles: [__webpack_require__(/*! ./count-harvest.component.scss */ "./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_1__["FeedInputService"],
            app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_4__["AddFarmService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], CountHarvestComponent);
    return CountHarvestComponent;
}());



/***/ }),

/***/ "./src/app/feed-input/cultivation-stage/cultivation-stage.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/feed-input/cultivation-stage/cultivation-stage.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlZWQtaW5wdXQvY3VsdGl2YXRpb24tc3RhZ2UvY3VsdGl2YXRpb24tc3RhZ2UuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/feed-input/cultivation-stage/cultivation-stage.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/feed-input/cultivation-stage/cultivation-stage.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CultivationStageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CultivationStageComponent", function() { return CultivationStageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_cultivation_stage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/cultivation-stage.service */ "./src/app/services/cultivation-stage.service.ts");
/* harmony import */ var app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/add-farm-owner.service */ "./src/app/services/add-farm-owner.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CultivationStageComponent = /** @class */ (function () {
    function CultivationStageComponent(CultivationStageService, AddFarmOwnerService) {
        this.CultivationStageService = CultivationStageService;
        this.AddFarmOwnerService = AddFarmOwnerService;
        this.postsFarmOwner = [];
        this.selectInputs = ['Feed', 'Water Medicine', 'CheckNet', 'Shrimp Condition',
            'Water Condition', 'Water Report'];
        this.selectFeeds = ['F1', 'F2', 'F3', 'F4'];
        this.selectTanks = ['T1', 'T2', 'T3', 'T4'];
        this.selectCNs = ['CN1', 'CN2', 'CN3', 'CN4', 'CN5', 'CN6'];
        this.selectServerity = ['1', '2', '3', '4', '5', '6'];
        this.selectMedicines = ['Diethylstilbestrol', 'Hexestrol', 'Dienestrol', 'Methyltestosterone', 'Metronidazole'];
        //dynamic button
        this.fieldArray = [{}];
        this.newAttribute = {};
        this.firstField = true;
        this.firstFieldName = 'First Item name';
        //ends
        //dynamic button
        this.fieldArray1 = [{}];
        this.newAttribute1 = {};
        this.firstField1 = true;
        this.firstFieldName1 = 'First Item name';
        //post  postAddWaterReport
        //dynamic array
        this.fieldArray2 = [{}, {}];
        this.fieldArray3 = [{}, {}];
        this.fieldArray4 = [{}, {}];
    }
    CultivationStageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.SelectedInput = this.selectInputs[2];
        this.AddFarmOwnerService.getFarmOwner();
        this.postsSubOwner = this.AddFarmOwnerService.getPostUpdateListener()
            .subscribe(function (farmOwnerData) {
            // this.isLoading = false;
            _this.postsFarmOwner = farmOwnerData;
            console.log(_this.postsFarmOwner);
        });
    };
    CultivationStageComponent.prototype.changeComboo = function (event) {
        console.log('chnaged', event && event.value);
    };
    CultivationStageComponent.prototype.addFieldValue = function (index) {
        if (this.fieldArray.length <= 10) {
            this.fieldArray.push(this.newAttribute);
            this.newAttribute = {};
        }
        else {
        }
    };
    CultivationStageComponent.prototype.deleteFieldValue = function (index) {
        this.fieldArray.splice(index, 1);
    };
    CultivationStageComponent.prototype.addFieldValue1 = function (index) {
        if (this.fieldArray1.length <= 10) {
            this.fieldArray1.push(this.newAttribute1);
            this.newAttribute1 = {};
        }
        else {
        }
    };
    CultivationStageComponent.prototype.deleteFieldValue1 = function (index) {
        this.fieldArray1.splice(index, 1);
    };
    //ends
    //add feeds
    CultivationStageComponent.prototype.postAddFeed = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.CultivationStageService.postAddFeeds(form.value.farmOwner, form.value.feedName, form.value.tankId, form.value.quantity, this.fieldArray1, form.value.unit, this.fieldArray);
        alert("Feeds Saved Sucessfully");
        form.reset();
    };
    //posting water medicne
    CultivationStageComponent.prototype.postAddWaterMedicine = function (form) {
        if (form.invalid) {
            return;
        }
        this.CultivationStageService.postAddWaterMedicine(form.value.farmOwner, form.value.tankId, this.fieldArray1, this.fieldArray);
        alert("Water Medicine Saved Sucessfully");
        form.reset();
    };
    //posting CheckNet
    CultivationStageComponent.prototype.postAddCheckNet = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.CultivationStageService.postAddWaterMedicine(form.value.farmOwner, form.value.tankId, form.value.feedName, this.fieldArray);
        alert("Water Medicine Saved Sucessfully");
        console.log(form.value);
        form.reset();
    };
    //post shrimp condtion
    CultivationStageComponent.prototype.postAddShrimpCondition = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.CultivationStageService.postAddShrimpCondition(form.value.farmOwner, form.value.tankId, form.value.serverity, form.value.file);
        alert("Shrimp condition Saved Sucessfully");
        console.log(form.value);
        form.reset();
    };
    //post postAddWaterCondition
    CultivationStageComponent.prototype.postAddWaterCondition = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.CultivationStageService.postAddWaterCondition(form.value.farmOwner, form.value.tankId, form.value.serverity, form.value.file);
        alert("Water condition Saved Sucessfully");
        console.log(form.value);
        form.reset();
    };
    CultivationStageComponent.prototype.postAddWaterReport = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.CultivationStageService.postAddWaterReport(form.value.farmOwner, form.value.tankId, this.fieldArray2, this.fieldArray3, this.fieldArray4);
        alert("Water Report Saved Sucessfully");
        console.log(form.value);
        form.reset();
    };
    CultivationStageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cultivation-stage',
            template: __webpack_require__(/*! raw-loader!./cultivation-stage.component.html */ "./node_modules/raw-loader/index.js!./src/app/feed-input/cultivation-stage/cultivation-stage.component.html"),
            styles: [__webpack_require__(/*! ./cultivation-stage.component.scss */ "./src/app/feed-input/cultivation-stage/cultivation-stage.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_cultivation_stage_service__WEBPACK_IMPORTED_MODULE_1__["CultivationStageService"],
            app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_2__["AddFarmOwnerService"]])
    ], CultivationStageComponent);
    return CultivationStageComponent;
}());



/***/ }),

/***/ "./src/app/feed-input/feed-checknet/feed-checknet.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/feed-input/feed-checknet/feed-checknet.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#div1 {\n  height: 300px;\n  width: 180px;\n  border: 2px solid pink;\n  border-radius: 10px;\n  text-align: center;\n  padding: 10px;\n  margin: 5px;\n  float: left;\n  background: #215480;\n  color: skyblue;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmVlZC1pbnB1dC9mZWVkLWNoZWNrbmV0L0U6XFxUaGlua1RhbmtlcnNcXFNocmltcFxcZnJvbnRlbmQvc3JjXFxhcHBcXGZlZWQtaW5wdXRcXGZlZWQtY2hlY2tuZXRcXGZlZWQtY2hlY2tuZXQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2ZlZWQtaW5wdXQvZmVlZC1jaGVja25ldC9mZWVkLWNoZWNrbmV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL2ZlZWQtaW5wdXQvZmVlZC1jaGVja25ldC9mZWVkLWNoZWNrbmV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiNkaXYxe1xyXG4gICAgaGVpZ2h0OjMwMHB4O1xyXG4gICAgd2lkdGg6MTgwcHg7XHJcbiAgICBib3JkZXI6MnB4IHNvbGlkIHBpbms7XHJcbiAgICBib3JkZXItcmFkaXVzOjEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgIHBhZGRpbmc6MTBweDtcclxuICAgIG1hcmdpbjo1cHg7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgYmFja2dyb3VuZDojMjE1NDgwO1xyXG4gICAgY29sb3I6c2t5Ymx1ZTtcclxuICAgIH0iLCIjZGl2MSB7XG4gIGhlaWdodDogMzAwcHg7XG4gIHdpZHRoOiAxODBweDtcbiAgYm9yZGVyOiAycHggc29saWQgcGluaztcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDVweDtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGJhY2tncm91bmQ6ICMyMTU0ODA7XG4gIGNvbG9yOiBza3libHVlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/feed-input/feed-checknet/feed-checknet.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/feed-input/feed-checknet/feed-checknet.component.ts ***!
  \*********************************************************************/
/*! exports provided: FeedChecknetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedChecknetComponent", function() { return FeedChecknetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/feed-input.service */ "./src/app/services/feed-input.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { exists } from 'fs';
var FeedChecknetComponent = /** @class */ (function () {
    function FeedChecknetComponent(formBuilder, _addFarmService, route, _inputFeed) {
        this.formBuilder = formBuilder;
        this._addFarmService = _addFarmService;
        this.route = route;
        this._inputFeed = _inputFeed;
        this.submitted = false;
        this.farmData = [];
        this.farmData_area = [];
        this.farmFetchedById = [];
        this.div_feed = false;
        this.div_checkNet = false;
        this.selectFeeds = ['Feed1', 'Feed2', 'Feed3', 'Feed4'];
    }
    FeedChecknetComponent.prototype.ngOnInit = function () {
        this.farm_Id = this.route.snapshot.params.farmId;
        this.farm_Date = this.route.snapshot.params.farmDate;
        // console.log(this.farm_Id);
        // console.log(this.farm_Date);
        this.feedsform = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            selectedAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            inputType: ['Feed', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            feedInput: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            TankInput: this.formBuilder.array([
                this.initResponse(),
            ])
        });
        this.checkNetform = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            selectedAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            inputType: ['CheckNet', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            feedInput: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            TankInput: this.formBuilder.array([
                this.initResponseCheckNet(),
            ])
        });
        this.getFarmData();
    };
    ;
    //for feed form
    FeedChecknetComponent.prototype.addfeedsform = function () {
        // add address to the list
        var control = this.feedsform.get('TankInput');
        control.push(this.initResponse());
    };
    FeedChecknetComponent.prototype.removeResponse = function (i) {
        // remove address from the list
        var control = this.feedsform.get('TankInput');
        control.removeAt(i);
    };
    //for checkNet form
    FeedChecknetComponent.prototype.addcheckNetform = function () {
        // add address to the list
        var control = this.checkNetform.get('TankInput');
        control.push(this.initResponse());
    };
    FeedChecknetComponent.prototype.removecheckNetform = function (i) {
        // remove address from the list
        var control = this.checkNetform.get('TankInput');
        control.removeAt(i);
    };
    FeedChecknetComponent.prototype.getFarmData = function () {
        var _this = this;
        this._addFarmService.getFarm().subscribe(function (data) {
            _this.farmData = data['posts'];
            console.log(_this.farmData);
            // this.farmData_area=this.farmData.tankArea;
            // console.log(this.farmData_area);
            _this.farmFetchedById = _this.farmData.filter(function (x) { return x.farmId === _this.farm_Id; });
            console.log(_this.farmFetchedById);
            _this.responseData = _this.farmFetchedById[0].tankArea;
            console.log(_this.responseData);
            _this.feedsform.setControl('TankInput', _this.setResponse(_this.responseData));
            _this.checkNetform.setControl('TankInput', _this.setResponseCheckNet(_this.responseData));
        });
    };
    FeedChecknetComponent.prototype.setResponse = function (responseSet) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
        responseSet.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                feed: s.feed,
                code: s.code,
                quantity_kg: s.quantity_kg,
                cn_gm_kg: s.cn_gm_kg,
                cn_gm: s.cn_gm,
                tank_area: s.tank_area,
                tank_name: s.tank_name,
            }));
        });
        return formArray;
    };
    //Adding tank_ dynamically for checknet
    FeedChecknetComponent.prototype.setResponseCheckNet = function (responseSet_CN) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
        responseSet_CN.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                GmperCN: s.GmperCN,
                Avgleft: s.Avgleft,
                Totalleft: s.Totalleft,
                NSperCN: s.NSperCN,
                Kalakalu: s.Kalakalu,
                eachCN1: s.eachCN1,
                eachCN2: s.eachCN2,
                eachCN3: s.eachCN3,
                eachCN4: s.eachCN4,
                tank_area: s.tank_area,
                tank_name: s.tank_name,
            }));
        });
        return formArray;
    };
    //add dynamic feed array
    FeedChecknetComponent.prototype.initResponse = function () {
        return this.formBuilder.group({
            feed: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            code: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            quantity_kg: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            cn_gm_kg: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            cn_gm: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            tank_area: [''],
            tank_name: ['']
        });
    };
    ;
    //add dynamic checknet array
    FeedChecknetComponent.prototype.initResponseCheckNet = function () {
        return this.formBuilder.group({
            GmperCN: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            Avgleft: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            Totalleft: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            NSperCN: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            Kalakalu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            eachCN1: [''],
            eachCN2: [''],
            eachCN3: [''],
            eachCN4: [''],
            tank_name: [''],
            tank_area: [''],
        });
    };
    ;
    FeedChecknetComponent.prototype.loadFeed = function () {
        this.div_feed = true;
        this.div_checkNet = false;
    };
    FeedChecknetComponent.prototype.loadChecknet = function () {
        this.div_feed = false;
        this.div_checkNet = true;
    };
    FeedChecknetComponent.prototype.changeFeed = function (event) {
        console.log(event);
        this.feedInput = event.value;
    };
    Object.defineProperty(FeedChecknetComponent.prototype, "f", {
        get: function () { return this.feedsform.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeedChecknetComponent.prototype, "c", {
        get: function () { return this.checkNetform.controls; },
        enumerable: true,
        configurable: true
    });
    //submit form
    FeedChecknetComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.feedsform.patchValue({ feedInput: this.feedInput });
        console.log(this.feedsform.value);
        if (!this.feedsform.valid) {
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createFeeds(this.feedsform.value)
                    .subscribe(function (res) {
                    if (res) {
                        alert('Feed added Successfully');
                    }
                }, function (error) {
                    console.log(error);
                    if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpErrorResponse"]) {
                        console.log(error.status);
                        console.log(error);
                        if (error.status === 400 || error.status === 500) {
                            alert('Feed `this.feedInput` already added for Date `this.farm_Date`');
                        }
                        else {
                            alert('internal error occured');
                        }
                    }
                    else {
                        // alert('internal error occured without any http error');
                        alert("Feed " + _this.feedInput + " for Date " + _this.farm_Date + " already exists");
                    }
                });
            }
        }
    };
    //submit checknet
    //submit form
    FeedChecknetComponent.prototype.onSubmitCheckNet = function () {
        this.submitted = true;
        this.checkNetform.patchValue({ feedInput: this.feedInput });
        console.log(this.checkNetform.value);
        if (!this.checkNetform.valid) {
            console.log('validation  error');
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createCheckNet(this.checkNetform.value)
                    .subscribe(function (res) {
                    alert('CheckNet added Successfully');
                    // this.router.navigateByUrl('/manageLesson');
                }, function (error) {
                    console.log(error);
                });
            }
        }
    };
    FeedChecknetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feed-checknet',
            template: __webpack_require__(/*! raw-loader!./feed-checknet.component.html */ "./node_modules/raw-loader/index.js!./src/app/feed-input/feed-checknet/feed-checknet.component.html"),
            styles: [__webpack_require__(/*! ./feed-checknet.component.scss */ "./src/app/feed-input/feed-checknet/feed-checknet.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_2__["AddFarmService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_4__["FeedInputService"]])
    ], FeedChecknetComponent);
    return FeedChecknetComponent;
}());



/***/ }),

/***/ "./src/app/feed-input/feed-input.component.scss":
/*!******************************************************!*\
  !*** ./src/app/feed-input/feed-input.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlZWQtaW5wdXQvZmVlZC1pbnB1dC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/feed-input/feed-input.component.ts":
/*!****************************************************!*\
  !*** ./src/app/feed-input/feed-input.component.ts ***!
  \****************************************************/
/*! exports provided: FeedInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedInputComponent", function() { return FeedInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedInputComponent = /** @class */ (function () {
    function FeedInputComponent(_farmService, router) {
        this._farmService = _farmService;
        this.router = router;
        this.farmData = [];
        this.pondPrepartionComponent = false;
        this.cultivationStage = false;
        this.FeedAndChecknet = false;
        this.WaterAndMedicine = false;
        this.Observations = false;
        this.CountHarvest = false;
        this.StockStocking = false;
    }
    FeedInputComponent.prototype.ngOnInit = function () {
        this.readFarm();
    };
    //read selected farm
    FeedInputComponent.prototype.selectedFarm = function (value) {
        console.log(value.viewModel);
        this.selectedFarmId = value.viewModel.farmId;
        console.log(this.selectedFarmId);
        // this.router.navigate(['/urlname/stockdata', id]);
        // this.router.navigate(['/feed-input',this.selectedFarmId]);
    };
    //read date
    FeedInputComponent.prototype.selectedDateFun = function (value) {
        this.selectedFarmDate = value.viewModel;
        console.log(this.selectedFarmDate);
        this.router.navigate(['/feed-input', { farmId: this.selectedFarmId, farmDate: this.selectedFarmDate }]);
    };
    //get farm owner data
    //read farm owner
    FeedInputComponent.prototype.readFarm = function () {
        var _this = this;
        this._farmService.getFarm().subscribe(function (data) {
            _this.farmData = data;
            console.log(data);
        });
    };
    FeedInputComponent.prototype.changeComboo = function (event) {
        console.log('chnaged', event && event.value);
    };
    FeedInputComponent.prototype.loadFeedAndChecknet = function () {
        this.FeedAndChecknet = true;
        this.cultivationStage = false;
        this.pondPrepartionComponent = false;
        this.WaterAndMedicine = false;
        this.Observations = false;
        this.CountHarvest = false;
        this.StockStocking = false;
        document.getElementById("b1").style.background = "green";
        document.getElementById("b2").style.background = "";
        document.getElementById("b3").style.background = "";
        document.getElementById("b4").style.background = "";
        document.getElementById("b5").style.background = "";
    };
    FeedInputComponent.prototype.loadWaterReportMedicine = function () {
        this.WaterAndMedicine = true;
        this.FeedAndChecknet = false;
        this.Observations = false;
        this.CountHarvest = false;
        this.StockStocking = false;
        document.getElementById("b1").style.background = "";
        document.getElementById("b2").style.background = "green";
        document.getElementById("b3").style.background = "";
        document.getElementById("b4").style.background = "";
        document.getElementById("b5").style.background = "";
    };
    FeedInputComponent.prototype.loadObservations = function () {
        this.Observations = true;
        this.WaterAndMedicine = false;
        this.FeedAndChecknet = false;
        this.CountHarvest = false;
        this.StockStocking = false;
        document.getElementById("b1").style.background = "";
        document.getElementById("b2").style.background = "";
        document.getElementById("b3").style.background = "green";
        document.getElementById("b4").style.background = "";
        document.getElementById("b5").style.background = "";
    };
    FeedInputComponent.prototype.loadCountHarvest = function () {
        this.Observations = false;
        this.WaterAndMedicine = false;
        this.FeedAndChecknet = false;
        this.CountHarvest = true;
        this.StockStocking = false;
        document.getElementById("b1").style.background = "";
        document.getElementById("b2").style.background = "";
        document.getElementById("b3").style.background = "";
        document.getElementById("b4").style.background = "green";
        document.getElementById("b5").style.background = "";
    };
    FeedInputComponent.prototype.loadStockStocking = function () {
        this.Observations = false;
        this.WaterAndMedicine = false;
        this.FeedAndChecknet = false;
        this.CountHarvest = false;
        this.StockStocking = true;
        document.getElementById("b1").style.background = "";
        document.getElementById("b2").style.background = "";
        document.getElementById("b3").style.background = "";
        document.getElementById("b4").style.background = "";
        document.getElementById("b5").style.background = "green";
    };
    FeedInputComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feed-input',
            template: __webpack_require__(/*! raw-loader!./feed-input.component.html */ "./node_modules/raw-loader/index.js!./src/app/feed-input/feed-input.component.html"),
            styles: [__webpack_require__(/*! ./feed-input.component.scss */ "./src/app/feed-input/feed-input.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__["AddFarmService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], FeedInputComponent);
    return FeedInputComponent;
}());



/***/ }),

/***/ "./src/app/feed-input/observations/observations.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/feed-input/observations/observations.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlZWQtaW5wdXQvb2JzZXJ2YXRpb25zL29ic2VydmF0aW9ucy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/feed-input/observations/observations.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/feed-input/observations/observations.component.ts ***!
  \*******************************************************************/
/*! exports provided: ObservationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservationsComponent", function() { return ObservationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/feed-input.service */ "./src/app/services/feed-input.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ObservationsComponent = /** @class */ (function () {
    function ObservationsComponent(formBuilder, _addFarmService, route, _inputFeed) {
        this.formBuilder = formBuilder;
        this._addFarmService = _addFarmService;
        this.route = route;
        this._inputFeed = _inputFeed;
        this.selectFeeds = ['Feed1', 'Feed2', 'Feed3', 'Feed4'];
        this.farmData = [];
        this.farmFetchedById = [];
        this.div_shrimp = false;
        this.div_water = false;
        this.submitted = false;
    }
    ObservationsComponent.prototype.ngOnInit = function () {
        this.farm_Id = this.route.snapshot.params.farmId;
        this.farm_Date = this.route.snapshot.params.farmDate;
        this.shrimpobvform = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            selectedAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            inputType: ['Shrimp Observation', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            feedInput: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            TankInput: this.formBuilder.array([
                this.initResponse(),
            ])
        });
        this.waterobvform = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            selectedAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            inputType: ['Water Observation', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            feedInput: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            TankInput: this.formBuilder.array([
                this.initResponseCheckNet(),
            ])
        });
        this.getFarmData();
    };
    ObservationsComponent.prototype.getFarmData = function () {
        var _this = this;
        this._addFarmService.getFarm().subscribe(function (data) {
            _this.farmData = data['posts'];
            console.log(_this.farmData);
            // this.farmData_area=this.farmData.tankArea;
            // console.log(this.farmData_area);
            _this.farmFetchedById = _this.farmData.filter(function (x) { return x.farmId === _this.farm_Id; });
            console.log(_this.farmFetchedById);
            _this.responseData = _this.farmFetchedById[0].tankArea;
            console.log(_this.responseData);
            _this.shrimpobvform.setControl('TankInput', _this.setResponseShrimp(_this.responseData));
            _this.waterobvform.setControl('TankInput', _this.setResponseWater(_this.responseData));
        });
    };
    ObservationsComponent.prototype.setResponseShrimp = function (responseSet) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([]);
        responseSet.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                tank_area: s.tank_area,
                tank_name: s.tank_name,
                no_body_moulting: s.no_body_moulting,
                no_head_moulting: s.no_head_moulting,
                no_moulting: s.no_moulting,
                no_new_shell_formation: s.no_new_shell_formation,
                meesum_cut_black: s.meesum_cut_black,
                meesum_cut: s.meesum_cut,
                garuku_meesum: s.garuku_meesum,
                long_fecals: s.long_fecals,
                yellow_fecals: s.yellow_fecals,
                white_fecals: s.white_fecals,
                white_gut: s.white_gut,
                empty_gut: s.empty_gut,
                plankton_gut: s.plankton_gut,
                soil_gut: s.soil_gut,
                gap_gut: s.gap_gut,
                black_gill: s.black_gill,
                brown_gill: s.brown_gill,
                no_jiguru: s.no_jiguru,
                size_variation: s.size_variation,
                toka_erupulu: s.toka_erupulu,
                kallu_erupulu: s.kallu_erupulu,
                kidny_color_change: s.kidny_color_change,
                head_water: s.head_water,
                white_muscle: s.white_muscle,
                mineral_bends: s.mineral_bends,
                gottuku_ravadam: s.gottuku_ravadam,
                paina_eedadam: s.paina_eedadam,
                body_cracks: s.body_cracks,
                hatchery_bends: s.hatchery_bends,
                loose_shell: s.loose_shell,
                deads: s.deads,
                EPH: s.EPH,
                virus: s.virus,
                white_spot: s.white_spot,
                potti_royya: s.potti_royya,
                snail: s.snail,
                do: s.do,
                theegalu: s.theegalu,
                chikkadanam: s.chikkadanam,
                water_crash: s.water_crash,
                turbidity: s.turbidity,
                water_color: s.water_color,
            }));
        });
        return formArray;
    };
    //Adding tank_ dynamically for checknet
    ObservationsComponent.prototype.setResponseWater = function (responseSet_water) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([]);
        responseSet_water.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                tank_area: s.tank_area,
                tank_name: s.tank_name,
                no_body_moulting: s.no_body_moulting,
                no_head_moulting: s.no_head_moulting,
                no_moulting: s.no_moulting,
                no_new_shell_formation: s.no_new_shell_formation,
                meesum_cut_black: s.meesum_cut_black,
                meesum_cut: s.meesum_cut,
                garuku_meesum: s.garuku_meesum,
                long_fecals: s.long_fecals,
                yellow_fecals: s.yellow_fecals,
                white_fecals: s.white_fecals,
                white_gut: s.white_gut,
                empty_gut: s.empty_gut,
                plankton_gut: s.plankton_gut,
                soil_gut: s.soil_gut,
                gap_gut: s.gap_gut,
                black_gill: s.black_gill,
                brown_gill: s.brown_gill,
                no_jiguru: s.no_jiguru,
                size_variation: s.size_variation,
                toka_erupulu: s.toka_erupulu,
                kallu_erupulu: s.kallu_erupulu,
                kidny_color_change: s.kidny_color_change,
                head_water: s.head_water,
                white_muscle: s.white_muscle,
                mineral_bends: s.mineral_bends,
                gottuku_ravadam: s.gottuku_ravadam,
                paina_eedadam: s.paina_eedadam,
                body_cracks: s.body_cracks,
                hatchery_bends: s.hatchery_bends,
                loose_shell: s.loose_shell,
                deads: s.deads,
                EPH: s.EPH,
                virus: s.virus,
                white_spot: s.white_spot,
                potti_royya: s.potti_royya,
                snail: s.snail,
                do: s.do,
                theegalu: s.theegalu,
                chikkadanam: s.chikkadanam,
                water_crash: s.water_crash,
                turbidity: s.turbidity,
                water_color: s.water_color,
            }));
        });
        return formArray;
    };
    //add dynamic feed array
    ObservationsComponent.prototype.initResponse = function () {
        return this.formBuilder.group({
            tank_area: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            tank_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_body_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_head_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_new_shell_formation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            meesum_cut_black: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            meesum_cut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            garuku_meesum: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            long_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            yellow_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            empty_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            plankton_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            soil_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            gap_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            black_gill: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            brown_gill: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_jiguru: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            size_variation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            toka_erupulu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            kallu_erupulu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            kidny_color_change: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            head_water: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_muscle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            mineral_bends: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            gottuku_ravadam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            paina_eedadam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            body_cracks: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            hatchery_bends: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            loose_shell: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            deads: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            EPH: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            virus: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_spot: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            potti_royya: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            snail: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            do: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            theegalu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            chikkadanam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            water_crash: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            turbidity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            water_color: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
    };
    ;
    //add dynamic checknet array
    ObservationsComponent.prototype.initResponseCheckNet = function () {
        return this.formBuilder.group({
            tank_area: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            tank_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_body_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_head_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_moulting: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_new_shell_formation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            meesum_cut_black: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            meesum_cut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            garuku_meesum: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            long_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            yellow_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_fecals: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            empty_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            plankton_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            soil_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            gap_gut: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            black_gill: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            brown_gill: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            no_jiguru: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            size_variation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            toka_erupulu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            kallu_erupulu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            kidny_color_change: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            head_water: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_muscle: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            mineral_bends: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            gottuku_ravadam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            paina_eedadam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            body_cracks: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            hatchery_bends: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            loose_shell: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            deads: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            EPH: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            virus: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            white_spot: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            potti_royya: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            snail: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            do: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            theegalu: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            chikkadanam: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            water_crash: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            turbidity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            water_color: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
    };
    ;
    ObservationsComponent.prototype.loadShrimpObv = function () {
        this.div_shrimp = true;
        this.div_water = false;
        document.getElementById("shrimpb1").style.background = "green";
        document.getElementById("waterb2").style.background = "";
    };
    ObservationsComponent.prototype.loadWaterObv = function () {
        this.div_shrimp = false;
        this.div_water = true;
        document.getElementById("shrimpb1").style.background = "";
        document.getElementById("waterb2").style.background = "green";
    };
    ObservationsComponent.prototype.changeFeed = function (event) {
        console.log(event);
        this.feedInput = event.value;
    };
    Object.defineProperty(ObservationsComponent.prototype, "f", {
        get: function () { return this.shrimpobvform.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObservationsComponent.prototype, "c", {
        get: function () { return this.waterobvform.controls; },
        enumerable: true,
        configurable: true
    });
    //submit form
    ObservationsComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.shrimpobvform.patchValue({ feedInput: this.feedInput });
        console.log(this.shrimpobvform.value);
        if (!this.shrimpobvform.valid && this.feedInput == 'undefined') {
            alert('Please select Feed');
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createShrimpObv(this.shrimpobvform.value)
                    .subscribe(function (res) {
                    alert('Shrimp Observation created Successfully');
                    // this.router.navigateByUrl('/manageLesson');
                }, function (error) {
                    console.log(error);
                });
            }
        }
    };
    //submit form
    ObservationsComponent.prototype.onSubmitWater = function () {
        this.submitted = true;
        this.waterobvform.patchValue({ feedInput: this.feedInput });
        console.log(this.waterobvform.value);
        if (!this.waterobvform.valid) {
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createWaterObv(this.waterobvform.value)
                    .subscribe(function (res) {
                    alert('Water Observation added Successfully');
                    // this.router.navigateByUrl('/manageLesson');
                }, function (error) {
                    console.log(error);
                });
            }
        }
    };
    ObservationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-observations',
            template: __webpack_require__(/*! raw-loader!./observations.component.html */ "./node_modules/raw-loader/index.js!./src/app/feed-input/observations/observations.component.html"),
            styles: [__webpack_require__(/*! ./observations.component.scss */ "./src/app/feed-input/observations/observations.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_1__["AddFarmService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_3__["FeedInputService"]])
    ], ObservationsComponent);
    return ObservationsComponent;
}());



/***/ }),

/***/ "./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlZWQtaW5wdXQvc3RvY2stc3RvY2tpbmcvc3RvY2stc3RvY2tpbmcvc3RvY2stc3RvY2tpbmcuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.ts ***!
  \**************************************************************************************/
/*! exports provided: StockStockingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StockStockingComponent", function() { return StockStockingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StockStockingComponent = /** @class */ (function () {
    function StockStockingComponent() {
    }
    StockStockingComponent.prototype.ngOnInit = function () {
    };
    StockStockingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-stock-stocking',
            template: __webpack_require__(/*! raw-loader!./stock-stocking.component.html */ "./node_modules/raw-loader/index.js!./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.html"),
            styles: [__webpack_require__(/*! ./stock-stocking.component.scss */ "./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], StockStockingComponent);
    return StockStockingComponent;
}());



/***/ }),

/***/ "./src/app/feed-input/water-medicine-report/water-medicine-report.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/feed-input/water-medicine-report/water-medicine-report.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlZWQtaW5wdXQvd2F0ZXItbWVkaWNpbmUtcmVwb3J0L3dhdGVyLW1lZGljaW5lLXJlcG9ydC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/feed-input/water-medicine-report/water-medicine-report.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/feed-input/water-medicine-report/water-medicine-report.component.ts ***!
  \*************************************************************************************/
/*! exports provided: WaterMedicineReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaterMedicineReportComponent", function() { return WaterMedicineReportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/services/feed-input.service */ "./src/app/services/feed-input.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WaterMedicineReportComponent = /** @class */ (function () {
    function WaterMedicineReportComponent(formBuilder, _addFarmService, route, _inputFeed) {
        this.formBuilder = formBuilder;
        this._addFarmService = _addFarmService;
        this.route = route;
        this._inputFeed = _inputFeed;
        this.selectFeeds = ['Feed1', 'Feed2', 'Feed3', 'Feed4'];
        this.farmData = [];
        this.farmFetchedById = [];
        this.div_Water_medicine = false;
        this.div_water_report = false;
        this.submitted = false;
    }
    WaterMedicineReportComponent.prototype.ngOnInit = function () {
        this.farm_Id = this.route.snapshot.params.farmId;
        this.farm_Date = this.route.snapshot.params.farmDate;
        // console.log(this.farm_Id);
        // console.log(this.farm_Date);
        this.watermedicineform = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            selectedAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            inputType: ['Water Medicine', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            feedInput: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            TankInput: this.formBuilder.array([
                this.initResponse(),
            ])
        });
        this.waterreportform = this.formBuilder.group({
            farmCode: [this.farm_Id, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            selectedAt: [this.farm_Date, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            inputType: ['Water Report', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            feedInput: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            TankInput: this.formBuilder.array([
                this.initResponseCheckNet(),
            ])
        });
        this.getFarmData();
    };
    WaterMedicineReportComponent.prototype.getFarmData = function () {
        var _this = this;
        this._addFarmService.getFarm().subscribe(function (data) {
            _this.farmData = data['posts'];
            console.log(_this.farmData);
            // this.farmData_area=this.farmData.tankArea;
            // console.log(this.farmData_area);
            _this.farmFetchedById = _this.farmData.filter(function (x) { return x.farmId === _this.farm_Id; });
            console.log(_this.farmFetchedById);
            _this.responseData = _this.farmFetchedById[0].tankArea;
            console.log(_this.responseData);
            _this.watermedicineform.setControl('TankInput', _this.setResponseMedicine(_this.responseData));
            _this.waterreportform.setControl('TankInput', _this.setResponseReport(_this.responseData));
        });
    };
    WaterMedicineReportComponent.prototype.setResponseMedicine = function (responseSet) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
        responseSet.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                time: s.time,
                code: s.code,
                quantity: s.quantity,
                tank_area: s.tank_area,
                tank_name: s.tank_name,
            }));
        });
        return formArray;
    };
    //Adding tank_ dynamically for checknet
    WaterMedicineReportComponent.prototype.setResponseReport = function (responseSet_CN) {
        var _this = this;
        var formArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
        responseSet_CN.forEach(function (s) {
            formArray.push(_this.formBuilder.group({
                tank_area: s.tank_area,
                tank_name: s.tank_name,
                salinity: s.salinity,
                alkality: s.alkality,
                hardness: s.hardness,
                ammonia: s.ammonia,
                calcium: s.calcium,
                magnesium: s.magnesium,
                potassium: s.potassium,
                phosphate: s.phosphate,
                chlorine: s.chlorine,
                fluoride: s.fluoride,
                iron: s.iron,
                nitrite: s.nitrite,
                nitrate: s.nitrate,
                turbidity: s.turbidity,
                green: s.green,
                yellow: s.yellow,
                do_am: s.do_am,
                do_noon: s.do_noon,
                do_pm: s.do_pm,
                ph_am: s.ph_am,
                ph_noon: s.ph_noon,
                ph_pm: s.ph_pm,
            }));
        });
        return formArray;
    };
    //add dynamic feed array
    WaterMedicineReportComponent.prototype.initResponse = function () {
        return this.formBuilder.group({
            time: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            code: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            quantity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            tank_area: [''],
            tank_name: ['']
        });
    };
    ;
    //add dynamic checknet array
    WaterMedicineReportComponent.prototype.initResponseCheckNet = function () {
        return this.formBuilder.group({
            salinity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            alkality: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            hardness: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            ammonia: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            calcium: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            magnesium: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            potassium: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            phosphate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            chlorine: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fluoride: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            iron: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            nitrite: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            nitrate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            turbidity: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            green: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            yellow: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            do_am: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            do_noon: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            do_pm: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            ph_am: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            ph_noon: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            ph_pm: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            tank_name: [''],
            tank_area: [''],
        });
    };
    ;
    WaterMedicineReportComponent.prototype.loadWaterMedicine = function () {
        this.div_Water_medicine = true;
        this.div_water_report = false;
    };
    WaterMedicineReportComponent.prototype.loadWaterReport = function () {
        this.div_Water_medicine = false;
        this.div_water_report = true;
    };
    WaterMedicineReportComponent.prototype.changeFeed = function (event) {
        console.log(event);
        this.feedInput = event.value;
    };
    Object.defineProperty(WaterMedicineReportComponent.prototype, "f", {
        get: function () { return this.watermedicineform.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WaterMedicineReportComponent.prototype, "c", {
        get: function () { return this.waterreportform.controls; },
        enumerable: true,
        configurable: true
    });
    //submit form
    WaterMedicineReportComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.watermedicineform.patchValue({ feedInput: this.feedInput });
        console.log(this.watermedicineform.value);
        if (!this.watermedicineform.valid && this.feedInput == 'undefined') {
            alert('Please select Feed');
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createWaterMedicine(this.watermedicineform.value)
                    .subscribe(function (res) {
                    alert('Water Medicine created Successfully');
                    // this.router.navigateByUrl('/manageLesson');
                }, function (error) {
                    console.log(error);
                });
            }
        }
    };
    //submit form
    WaterMedicineReportComponent.prototype.onSubmitWaterReport = function () {
        this.submitted = true;
        this.waterreportform.patchValue({ feedInput: this.feedInput });
        console.log(this.waterreportform.value);
        if (!this.waterreportform.valid) {
            return false;
        }
        else {
            if (window.confirm('Are you sure?')) {
                this._inputFeed.createWaterReport(this.waterreportform.value)
                    .subscribe(function (res) {
                    alert('Water Report added Successfully');
                    // this.router.navigateByUrl('/manageLesson');
                }, function (error) {
                    console.log(error);
                });
            }
        }
    };
    WaterMedicineReportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-water-medicine-report',
            template: __webpack_require__(/*! raw-loader!./water-medicine-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/feed-input/water-medicine-report/water-medicine-report.component.html"),
            styles: [__webpack_require__(/*! ./water-medicine-report.component.scss */ "./src/app/feed-input/water-medicine-report/water-medicine-report.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_2__["AddFarmService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            app_services_feed_input_service__WEBPACK_IMPORTED_MODULE_4__["FeedInputService"]])
    ], WaterMedicineReportComponent);
    return WaterMedicineReportComponent;
}());



/***/ }),

/***/ "./src/app/inspections/inspections.component.scss":
/*!********************************************************!*\
  !*** ./src/app/inspections/inspections.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2luc3BlY3Rpb25zL2luc3BlY3Rpb25zLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/inspections/inspections.component.ts":
/*!******************************************************!*\
  !*** ./src/app/inspections/inspections.component.ts ***!
  \******************************************************/
/*! exports provided: InspectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectionsComponent", function() { return InspectionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/add-farm.service */ "./src/app/services/add-farm.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InspectionsComponent = /** @class */ (function () {
    // @ViewChild(MatSort) sort:MatSort;
    function InspectionsComponent(AddFarmService) {
        this.AddFarmService = AddFarmService;
        this.length = 100;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
        this.inspectiondataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
    }
    InspectionsComponent.prototype.ngOnInit = function () {
        this.getInspections();
    };
    InspectionsComponent.prototype.getInspections = function () {
        var _this = this;
        this.AddFarmService.getInspections().subscribe((function (data) {
            _this.inspections = data;
            console.log(data);
            _this.inspectiondataSource = _this.inspections.posts;
        }));
    };
    InspectionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-inspections',
            template: __webpack_require__(/*! raw-loader!./inspections.component.html */ "./node_modules/raw-loader/index.js!./src/app/inspections/inspections.component.html"),
            styles: [__webpack_require__(/*! ./inspections.component.scss */ "./src/app/inspections/inspections.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_add_farm_service__WEBPACK_IMPORTED_MODULE_2__["AddFarmService"]])
    ], InspectionsComponent);
    return InspectionsComponent;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.module.ts ***!
  \*************************************************************/
/*! exports provided: AdminLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutModule", function() { return AdminLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _admin_layout_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-layout.routing */ "./src/app/layouts/admin-layout/admin-layout.routing.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _registration_registration_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../registration/registration.component */ "./src/app/registration/registration.component.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select-ng-select.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var app_add_farm_add_farm_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/add-farm/add-farm.component */ "./src/app/add-farm/add-farm.component.ts");
/* harmony import */ var app_feed_input_feed_input_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/feed-input/feed-input.component */ "./src/app/feed-input/feed-input.component.ts");
/* harmony import */ var app_pond_prepartion_pond_prepartion_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/pond-prepartion/pond-prepartion.component */ "./src/app/pond-prepartion/pond-prepartion.component.ts");
/* harmony import */ var app_feed_input_cultivation_stage_cultivation_stage_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/feed-input/cultivation-stage/cultivation-stage.component */ "./src/app/feed-input/cultivation-stage/cultivation-stage.component.ts");
/* harmony import */ var app_feed_input_feed_checknet_feed_checknet_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/feed-input/feed-checknet/feed-checknet.component */ "./src/app/feed-input/feed-checknet/feed-checknet.component.ts");
/* harmony import */ var app_feed_input_water_medicine_report_water_medicine_report_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/feed-input/water-medicine-report/water-medicine-report.component */ "./src/app/feed-input/water-medicine-report/water-medicine-report.component.ts");
/* harmony import */ var app_feed_input_observations_observations_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/feed-input/observations/observations.component */ "./src/app/feed-input/observations/observations.component.ts");
/* harmony import */ var app_feed_input_count_harvest_count_harvest_count_harvest_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! app/feed-input/count-harvest/count-harvest/count-harvest.component */ "./src/app/feed-input/count-harvest/count-harvest/count-harvest.component.ts");
/* harmony import */ var app_feed_input_stock_stocking_stock_stocking_stock_stocking_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! app/feed-input/stock-stocking/stock-stocking/stock-stocking.component */ "./src/app/feed-input/stock-stocking/stock-stocking/stock-stocking.component.ts");
/* harmony import */ var app_customers_data_customers_data_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! app/customers-data/customers-data.component */ "./src/app/customers-data/customers-data.component.ts");
/* harmony import */ var app_inspections_inspections_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! app/inspections/inspections.component */ "./src/app/inspections/inspections.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AdminLayoutModule = /** @class */ (function () {
    function AdminLayoutModule() {
    }
    AdminLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_admin_layout_routing__WEBPACK_IMPORTED_MODULE_4__["AdminLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__["NgSelectModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatRadioModule"], ngx_pagination__WEBPACK_IMPORTED_MODULE_7__["NgxPaginationModule"]
            ],
            declarations: [
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"],
                _registration_registration_component__WEBPACK_IMPORTED_MODULE_6__["RegistrationComponent"],
                app_add_farm_add_farm_component__WEBPACK_IMPORTED_MODULE_10__["AddFarmComponent"],
                app_feed_input_feed_input_component__WEBPACK_IMPORTED_MODULE_11__["FeedInputComponent"],
                app_pond_prepartion_pond_prepartion_component__WEBPACK_IMPORTED_MODULE_12__["PondPrepartionComponent"],
                app_feed_input_cultivation_stage_cultivation_stage_component__WEBPACK_IMPORTED_MODULE_13__["CultivationStageComponent"],
                app_feed_input_feed_checknet_feed_checknet_component__WEBPACK_IMPORTED_MODULE_14__["FeedChecknetComponent"],
                app_feed_input_water_medicine_report_water_medicine_report_component__WEBPACK_IMPORTED_MODULE_15__["WaterMedicineReportComponent"],
                app_feed_input_observations_observations_component__WEBPACK_IMPORTED_MODULE_16__["ObservationsComponent"],
                app_feed_input_count_harvest_count_harvest_count_harvest_component__WEBPACK_IMPORTED_MODULE_17__["CountHarvestComponent"],
                app_feed_input_stock_stocking_stock_stocking_stock_stocking_component__WEBPACK_IMPORTED_MODULE_18__["StockStockingComponent"],
                app_customers_data_customers_data_component__WEBPACK_IMPORTED_MODULE_19__["CustomersDataComponent"],
                app_inspections_inspections_component__WEBPACK_IMPORTED_MODULE_20__["InspectionsComponent"]
            ]
        })
    ], AdminLayoutModule);
    return AdminLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.routing.ts ***!
  \**************************************************************/
/*! exports provided: AdminLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutRoutes", function() { return AdminLayoutRoutes; });
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var app_registration_registration_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/registration/registration.component */ "./src/app/registration/registration.component.ts");
/* harmony import */ var app_add_farm_add_farm_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/add-farm/add-farm.component */ "./src/app/add-farm/add-farm.component.ts");
/* harmony import */ var app_feed_input_feed_input_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/feed-input/feed-input.component */ "./src/app/feed-input/feed-input.component.ts");
/* harmony import */ var app_customers_data_customers_data_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/customers-data/customers-data.component */ "./src/app/customers-data/customers-data.component.ts");
/* harmony import */ var app_inspections_inspections_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/inspections/inspections.component */ "./src/app/inspections/inspections.component.ts");






var AdminLayoutRoutes = [
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"] },
    { path: 'registration', component: app_registration_registration_component__WEBPACK_IMPORTED_MODULE_1__["RegistrationComponent"] },
    { path: 'add-farm', component: app_add_farm_add_farm_component__WEBPACK_IMPORTED_MODULE_2__["AddFarmComponent"] },
    { path: 'feed-input', component: app_feed_input_feed_input_component__WEBPACK_IMPORTED_MODULE_3__["FeedInputComponent"] },
    { path: 'feed-input/:farmId', component: app_feed_input_feed_input_component__WEBPACK_IMPORTED_MODULE_3__["FeedInputComponent"] },
    { path: 'feed-input/:farmId/:farmDate', component: app_feed_input_feed_input_component__WEBPACK_IMPORTED_MODULE_3__["FeedInputComponent"] },
    { path: 'customers-data', component: app_customers_data_customers_data_component__WEBPACK_IMPORTED_MODULE_4__["CustomersDataComponent"] },
    { path: 'inspection-data', component: app_inspections_inspections_component__WEBPACK_IMPORTED_MODULE_5__["InspectionsComponent"] },
];


/***/ }),

/***/ "./src/app/pond-prepartion/pond-prepartion.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pond-prepartion/pond-prepartion.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BvbmQtcHJlcGFydGlvbi9wb25kLXByZXBhcnRpb24uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pond-prepartion/pond-prepartion.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pond-prepartion/pond-prepartion.component.ts ***!
  \**************************************************************/
/*! exports provided: PondPrepartionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PondPrepartionComponent", function() { return PondPrepartionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_pond_preparation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/pond-preparation.service */ "./src/app/services/pond-preparation.service.ts");
/* harmony import */ var app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/add-farm-owner.service */ "./src/app/services/add-farm-owner.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PondPrepartionComponent = /** @class */ (function () {
    function PondPrepartionComponent(PondPreparationService, AddFarmOwnerService) {
        this.PondPreparationService = PondPreparationService;
        this.AddFarmOwnerService = AddFarmOwnerService;
        this.postsFarmOwner = [];
        this.selectPondInputs = ['Add Medicine', 'Add Water Report', 'Add Picture'];
        this.selectTanks = ['T1', 'T2', 'T3', 'T4'];
        this.selectMedicines = ['Diethylstilbestrol', 'Hexestrol', 'Dienestrol', 'Methyltestosterone', 'Metronidazole'];
    }
    PondPrepartionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.SelectedPondInputs = this.selectPondInputs[0];
        this.AddFarmOwnerService.getFarmOwner();
        this.postsSubOwner = this.AddFarmOwnerService.getPostUpdateListener()
            .subscribe(function (farmOwnerData) {
            // this.isLoading = false;
            _this.postsFarmOwner = farmOwnerData;
            console.log(_this.postsFarmOwner);
        });
    };
    PondPrepartionComponent.prototype.ChangePondStage = function (event) {
        console.log('chnaged', event && event.value);
    };
    PondPrepartionComponent.prototype.postAddMedicine = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.PondPreparationService.postAddMedicine(form.value.farmOwner, form.value.selectMedicine, form.value.selectTank, form.value.dosage);
        alert("Medcine Saved Sucessfully");
        form.reset();
    };
    PondPrepartionComponent.prototype.postAddWaterReport = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.PondPreparationService.postAddWaterReport(form.value.farmOwner, form.value.selectTank, form.value.selectTime, form.value.selectPH);
        alert("Water Report Saved Sucessfully");
        console.log(form.value);
        form.reset();
    };
    //add picture
    PondPrepartionComponent.prototype.postAddPicture = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.PondPreparationService.postAddPicture(form.value.farmOwner, form.value.selectTank, form.value.addFile);
        alert("Picture Saved Sucessfully");
        console.log(form.value);
        form.reset();
    };
    PondPrepartionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pond-prepartion',
            template: __webpack_require__(/*! raw-loader!./pond-prepartion.component.html */ "./node_modules/raw-loader/index.js!./src/app/pond-prepartion/pond-prepartion.component.html"),
            styles: [__webpack_require__(/*! ./pond-prepartion.component.scss */ "./src/app/pond-prepartion/pond-prepartion.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_pond_preparation_service__WEBPACK_IMPORTED_MODULE_1__["PondPreparationService"], app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_2__["AddFarmOwnerService"]])
    ], PondPrepartionComponent);
    return PondPrepartionComponent;
}());



/***/ }),

/***/ "./src/app/registration/registration.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/registration/registration.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/registration/registration.component.ts":
/*!********************************************************!*\
  !*** ./src/app/registration/registration.component.ts ***!
  \********************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/add-farm-owner.service */ "./src/app/services/add-farm-owner.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(AddFarmOwnerService) {
        this.AddFarmOwnerService = AddFarmOwnerService;
    }
    RegistrationComponent.prototype.ngOnInit = function () {
    };
    RegistrationComponent.prototype.postFarmOwner = function (form) {
        if (form.invalid) {
            console.log(form);
            return;
        }
        this.AddFarmOwnerService.postFarmOwner(form.value.firstName, form.value.lastName, form.value.mobile);
        // form.value.address,form.value.referral,form.value.pan,
        // form.value.adhaar,form.value.panFile,form.value.adhaarFile,form.value.companyName,
        // form.value.companyPan,form.value.companyAdhaar,form.value.companyGstNo,form.value.companyPanFile,
        // form.value.companyAdhaarFile
        // );
        alert("Owner Registered Sucessfully");
        form.reset();
    };
    RegistrationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-registration',
            template: __webpack_require__(/*! raw-loader!./registration.component.html */ "./node_modules/raw-loader/index.js!./src/app/registration/registration.component.html"),
            styles: [__webpack_require__(/*! ./registration.component.scss */ "./src/app/registration/registration.component.scss")]
        }),
        __metadata("design:paramtypes", [app_services_add_farm_owner_service__WEBPACK_IMPORTED_MODULE_1__["AddFarmOwnerService"]])
    ], RegistrationComponent);
    return RegistrationComponent;
}());



/***/ }),

/***/ "./src/app/services/add-farm-owner.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/add-farm-owner.service.ts ***!
  \****************************************************/
/*! exports provided: AddFarmOwnerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFarmOwnerService", function() { return AddFarmOwnerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddFarmOwnerService = /** @class */ (function () {
    function AddFarmOwnerService(http) {
        this.http = http;
        this.posts = [];
        this.postsUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    //get farm owner
    // get all Lesson
    AddFarmOwnerService.prototype.getFarmOwner = function () {
        return this.http.get(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/readFarmOwner');
    };
    AddFarmOwnerService.prototype.getPostUpdateListener = function () {
        return this.postsUpdated.asObservable();
    };
    //post farm owner
    AddFarmOwnerService.prototype.postFarmOwner = function (firstName, lastName, mobile) {
        var _this = this;
        var post = {
            id: null, firstName: firstName, lastName: lastName,
            mobile: mobile,
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/addfarmowner', 
        // 'http://localhost:3000/addFarm',
        post).subscribe(function (res) {
            // this.getFarm
            var id = res.postId;
            post.id = id;
            _this.posts.push(post);
            // this.postsUpdated.next([...this.posts]);
        });
    };
    AddFarmOwnerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AddFarmOwnerService);
    return AddFarmOwnerService;
}());



/***/ }),

/***/ "./src/app/services/add-farm.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/add-farm.service.ts ***!
  \**********************************************/
/*! exports provided: AddFarmService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFarmService", function() { return AddFarmService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { from } from 'rxjs';


var AddFarmService = /** @class */ (function () {
    function AddFarmService(http) {
        this.http = http;
        this.posts = [];
        //AddFarm is array of posted farms
        this.postsUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.Farms = [];
    }
    // getFarm() {
    //   this.http.get('http://localhost:3000/addFarm').subscribe(res => {
    //     this.Farms = res.json();
    //   });
    // }
    AddFarmService.prototype.getFarm = function () {
        return this.http.get(environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + '/readFarm');
    };
    // getFarm() {
    //   this.http
    //     .get<{ message: string; posts: any }>(
    //       environment.baseUrl + '/readFarm'
    //       // "http://localhost:3000/readFarm"
    //     )
    //     .pipe(map((postData) => {
    //       console.log(postData);
    //       // this.Farms=postData;
    //       // console.log(posts);
    //       return postData.posts.map(post => {
    //         return {
    //           farmOwner: post.farmOwner,
    //           farmHistory: post.farmHistory,
    //           village: post.village,
    //           mandal: post.mandal, 
    //           city: post.city,
    //           state: post.state, 
    //           zip: post.zip,
    //           country: post.country,
    //           noOfEmployess: post.noOfEmployess,
    //           noOfTanks: post.noOfTanks,
    //           id: post._id
    //         };
    //       });
    //     }))
    //     .subscribe(transformedPosts => {
    //       this.posts = transformedPosts;
    //       this.postsUpdated.next([...this.posts]);
    //     });
    // }
    AddFarmService.prototype.getPostUpdateListener = function () {
        return this.postsUpdated.asObservable();
    };
    AddFarmService.prototype.postFarm = function (farmOwner, farmHistory, village, mandal, city, state, zip, country, noOfTanks, noOfEmployess, tankCode, tankArea) {
        var _this = this;
        var post = {
            id: null, farmOwner: farmOwner, farmHistory: farmHistory,
            village: village, mandal: mandal, city: city, state: state, zip: zip,
            country: country, noOfTanks: noOfTanks, noOfEmployess: noOfEmployess,
            tankCode: tankCode, tankArea: tankArea
        };
        console.log(post);
        // return
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + '/addFarm', 
        // 'http://localhost:3000/addFarm',
        post).subscribe(function (res) {
            // this.getFarm
            var id = res.postId;
            post.id = id;
            _this.posts.push(post);
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    AddFarmService.prototype.deleteFarm = function (postId) {
        var _this = this;
        this.http.delete(environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + '/deletefarm/' + postId)
            // "http://localhost:3000/deletefarm/" + postId)
            .subscribe(function () {
            var updatedPosts = _this.posts.filter(function (post) { return post.id !== postId; });
            _this.posts = updatedPosts;
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    AddFarmService.prototype.getCustoemrs = function () {
        return this.http.get(environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + '/getCustomers');
    };
    AddFarmService.prototype.getInspections = function () {
        return this.http.get(environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].baseUrl + '/getInspections');
    };
    AddFarmService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AddFarmService);
    return AddFarmService;
}());



/***/ }),

/***/ "./src/app/services/cultivation-stage.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/cultivation-stage.service.ts ***!
  \*******************************************************/
/*! exports provided: CultivationStageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CultivationStageService", function() { return CultivationStageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CultivationStageService = /** @class */ (function () {
    // private postsWaterMedicineUpdated = new Subject<AddWaterMedicine[]>();
    function CultivationStageService(http) {
        this.http = http;
        this.posts = [];
        this.postsUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.postsWaterMedicine = [];
        this.postsCheckNet = [];
        this.postsShrimpConditon = [];
        this.postsWaterCondition = [];
        this.postsWaterReport = [];
    }
    //post Feeds
    CultivationStageService.prototype.postAddFeeds = function (farmOwner, feedName, tankId, quantity, medicines, unit, frequencyDetails) {
        var _this = this;
        var post = {
            id: null,
            farmOwner: farmOwner,
            feedName: feedName,
            tankId: tankId,
            quantity: quantity,
            medicines: medicines,
            unit: unit,
            frequencyDetails: frequencyDetails
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/i/cultivation/feed', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.posts.push(post);
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    //post water medicine
    CultivationStageService.prototype.postAddWaterMedicine = function (farmOwner, tankId, medicines, frequencyDetails) {
        var _this = this;
        var post = {
            id: null,
            farmOwner: farmOwner,
            tankId: tankId,
            medicines: medicines,
            frequencyDetails: frequencyDetails
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/i/cultivation/watermedicine', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.postsWaterMedicine.push(post);
            //  this.postsUpdated.next([...this.posts]);
        });
    };
    //add checknet
    CultivationStageService.prototype.postAddCheckNet = function (farmOwner, tankId, feedName, leftCheckNet) {
        var _this = this;
        var post = { id: null, farmOwner: farmOwner, tankId: tankId, feedName: feedName, leftCheckNet: leftCheckNet
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/i/cultivation/checknet', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.postsCheckNet.push(post);
            //  this.postsUpdated.next([...this.posts]);
        });
    };
    //addshrimp condtioin
    CultivationStageService.prototype.postAddShrimpCondition = function (farmOwner, tankId, serverity, file) {
        var _this = this;
        var post = { id: null, farmOwner: farmOwner, tankId: tankId, serverity: serverity, file: file
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/i/cultivation/shrimpcondition', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.postsShrimpConditon.push(post);
            //  this.postsUpdated.next([...this.posts]);
        });
    };
    //addWatercondtioin
    CultivationStageService.prototype.postAddWaterCondition = function (farmOwner, tankId, serverity, file) {
        var _this = this;
        var post = { id: null, farmOwner: farmOwner, tankId: tankId, serverity: serverity, file: file
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/i/cultivation/watercondition', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.postsWaterCondition.push(post);
            //  this.postsUpdated.next([...this.posts]);
        });
    };
    //add water report
    CultivationStageService.prototype.postAddWaterReport = function (farmOwner, tankId, waterPhReport, waterTributeReport, waterDoReport) {
        var _this = this;
        var post = { id: null, farmOwner: farmOwner, tankId: tankId, waterPhReport: waterPhReport,
            waterTributeReport: waterTributeReport, waterDoReport: waterDoReport
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/i/cultivation/waterreport', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.postsWaterReport.push(post);
            //  this.postsUpdated.next([...this.posts]);
        });
    };
    CultivationStageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CultivationStageService);
    return CultivationStageService;
}());



/***/ }),

/***/ "./src/app/services/feed-input.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/feed-input.service.ts ***!
  \************************************************/
/*! exports provided: FeedInputService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedInputService", function() { return FeedInputService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FeedInputService = /** @class */ (function () {
    function FeedInputService(http) {
        this.http = http;
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]().set('Content-Type', 'application/json');
    }
    // Create feed
    FeedInputService.prototype.createFeeds = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/feed', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create checknet
    FeedInputService.prototype.createCheckNet = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/checknet', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create water medicine
    FeedInputService.prototype.createWaterMedicine = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/waterMedicine', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create water rep
    FeedInputService.prototype.createWaterReport = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/waterReport', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create shrimp observation
    FeedInputService.prototype.createShrimpObv = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/shrimpObservation', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create water observation
    FeedInputService.prototype.createWaterObv = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/waterObservation', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create count
    FeedInputService.prototype.createCount = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/count', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create half Harvest
    FeedInputService.prototype.createHalfHarvest = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/halfHarvest', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Create Full Harvest
    FeedInputService.prototype.createFullHarvest = function (data) {
        return this.http.post(environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + '/i/DataInput/fullHarvest', data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorMgmt));
    };
    // Error handling 
    FeedInputService.prototype.errorMgmt = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        console.log(errorMessage);
        if (error.status === 400) {
            alert('Feed `this.feedInput` already added for Date `this.farm_Date`');
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    FeedInputService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], FeedInputService);
    return FeedInputService;
}());



/***/ }),

/***/ "./src/app/services/pond-preparation.service.ts":
/*!******************************************************!*\
  !*** ./src/app/services/pond-preparation.service.ts ***!
  \******************************************************/
/*! exports provided: PondPreparationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PondPreparationService", function() { return PondPreparationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PondPreparationService = /** @class */ (function () {
    function PondPreparationService(http) {
        this.http = http;
        this.posts = [];
        this.posts1 = [];
        this.addPicture = [];
        this.posts2 = [];
        this.postsUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    //post medicine
    PondPreparationService.prototype.postAddMedicine = function (farmOwner, selectMedicine, selectTank, dosage) {
        var _this = this;
        var post = {
            id: null,
            farmOwner: farmOwner,
            selectMedicine: selectMedicine,
            selectTank: selectTank,
            dosage: dosage
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/addFarmMedicine', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.posts.push(post);
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    //post Water Report
    PondPreparationService.prototype.postAddWaterReport = function (farmOwner, selectTank, selectTime, selectPH) {
        var _this = this;
        var post = {
            id: null,
            farmOwner: farmOwner,
            selectTank: selectTank,
            selectTime: selectTime,
            selectPH: selectPH
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/addFarmWaterReport', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.posts1.push(post);
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    //add picture
    //post Water Report
    PondPreparationService.prototype.postAddPicture = function (farmOwner, selectTank, addFile) {
        var _this = this;
        var post = {
            id: null,
            farmOwner: farmOwner,
            selectTank: selectTank,
            addFile: addFile
        };
        this.http.
            post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl + '/addPicture', post).subscribe(function (res) {
            var id = res.postId;
            post.id = id;
            _this.addPicture.push(post);
            _this.postsUpdated.next(_this.posts.slice());
        });
    };
    PondPreparationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], PondPreparationService);
    return PondPreparationService;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-admin-layout-admin-layout-module.js.map
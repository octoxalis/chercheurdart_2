function throttle (func, waitMS = 200) {
    let isWait = false;
    
    return function(...args) {
        if (!isWait) {
            func.call(this, ...args);
            isWait = true;
            
            setTimeout(() => {
               isWait = false;
            }, waitMS);
        }
    }
}

/*
function func(x) {
  console.log(x);
}

const throttledFunc = throttle(func)

// Will be called
throttledFunc(1);

// Won't be called because of throttling
throttledFunc(1);

// Will be called because it is called after the throttle limit has expired from the initial call above
setTimeout(() => throttledFunc(1), 200);
*/




//: 1
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

//: 2
function debounce(callback, waitMS = 200) {
   let timeoutId;
	
   return function(...args) {
      const context = this
      clearTimeout(timeoutId);

      timeoutId = setTimeout(function(){
        timeoutId = null
        callback.call(context, ...args)
      }, waitMS);
	};
};

/*
function func(x) {
  console.log(x);
}

const debouncedFunc = debounce(func)

// Will be called
debouncedFunc(1);

// Won't be called because of debouncing
debouncedFunc(1);

// Will be called because it is called after the debounce limit has expired from the initial call above
setTimeout(() => debouncedFunc(1), 200);
*/

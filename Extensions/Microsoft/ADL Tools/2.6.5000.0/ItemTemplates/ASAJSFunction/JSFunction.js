// Sample UDF which returns sum of two values.
function UDFSample(arg1, arg2) {
	'use strict';
    return arg1 + arg2;
}


// Sample UDA which sums incoming values.
function UDASample() {
	'use strict';
    this.init = function () {
        this.state = 0;
    }

    this.accumulate = function (value, timestamp) {
        this.state += value;
    }

    /*this.deaccumulate = function (value, timestamp) {
        this.state -= value;
    }

    this.deaccumulateState = function (otherState) {
          this.state -= otherState.state;
    }*/

    this.computeResult = function () {
        return this.state;
    }
}
/* This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. */

'use strict';
module.exports = perform_aligned_sum_operation;


// 12/15/2016 - save stack space by using a variable instead of return

try {
	var global_value_holder=null;
} catch(exception) {
	var global_value_holder; 
}
var i;
	

function perform_aligned_sum_operation(number_one,number_two) {
	var object_template = {
       	subvalues:[],
        multiplier:1
    };

	prepare_values(number_one+"",object_template);
	var first_value_object = global_value_holder;

	object_template = {
        subvalues:[],
        multiplier:1
    };

	
	prepare_values(number_two+"",object_template);
	var second_value_object = global_value_holder;
	

	align_integer_values(first_value_object,second_value_object);

	align_decimal_values(first_value_object,second_value_object);

	perform_core_op(first_value_object.subvalues[0],second_value_object.subvalues[0]);
	var integer_result = global_value_holder;

	perform_core_op(first_value_object.subvalues[1],second_value_object.subvalues[1]);

	var decimal_result = global_value_holder;

	
	global_value_holder =  integer_result+(decimal_result/Number(biggest_multiplier(first_value_object,second_value_object)));

	return global_value_holder;
}

function perform_core_op(value_oner,value_b) {

	var multiplier = 1;
	var value_to_return  = 0;

	for (i=value_oner.length-1;i>-1;i--) {
		value_to_return += (Number(value_oner.charAt(i)) * multiplier) + (Number(value_b.charAt(i)) * multiplier);
		multiplier = multiplier * 10;
	}
	global_value_holder = value_to_return;
}
		
		

function prepare_values(number_value_,return_template) {

	if (number_value_.indexOf(".")>-1) {
        return_template.subvalues[0] = number_value_.substring(0,number_value_.indexOf("."));
        return_template.subvalues[1] = number_value_.substring(number_value_.indexOf(".")+1,number_value_.length);

		digits_in_number(return_template.subvalues[1]);	
		var digit_count = global_value_holder;

        for (i=0;i<digit_count+1;i++) {
            return_template.multiplier = return_template.multiplier+"0";
        }

	} else if (number_value_.indexOf(".")<=-1) {
		return_template.subvalues=[number_value_,0];
		return_template.multiplier = 1;
	}
	
	global_value_holder = {
		subvalues:[return_template.subvalues[0],return_template.subvalues[1]],
		multiplier:return_template['multiplier']
	};
}

function digits_in_number(number) {
	var final_value=0;
	var increment_by_amount = 1;
	for (var i=1;i<number.length;i++) {
		final_value = final_value+increment_by_amount;
	}
	global_value_holder = final_value;
}

function align_integer_values(first_value_object,second_value_object) {
	var the_short_one;
	var the_long_one;
	var they_are_the_same_length;

	digits_in_number(first_value_object.subvalues[0]);
	var digits_in_first_value_object = global_value_holder;
	digits_in_number(second_value_object.subvalues[0]);
	var digits_in_second_value_object = global_value_holder;

	if (digits_in_first_value_object > digits_in_second_value_object) {
		the_long_one = first_value_object;
		the_short_one = second_value_object;
	}
	if (digits_in_second_value_object > digits_in_first_value_object) {
		the_long_one = second_value_object;
		the_short_one = first_value_object;
	}
	var zeroes_to_add = ((value_objects_are_equal(the_long_one,first_value_object)) ?digits_in_first_value_object:digits_in_second_value_object)
	+ (
		 ((value_objects_are_equal(the_long_one,first_value_object))?digits_in_second_value_object:digits_in_first_value_object)
		 -
		 (((value_objects_are_equal(the_long_one,first_value_object))?digits_in_second_value_object:digits_in_first_value_object) * 2)
	);

	for (i=0;i<zeroes_to_add;i++) {
		the_short_one.subvalues[0] = "0"+the_short_one.subvalues[0];
	}
}

function align_decimal_values(first_value_object,second_value_object) {
	var the_short_one;
    var the_long_one;
    var they_are_the_same_length;

    digits_in_number(first_value_object.subvalues[1]);
    var digits_in_first_value_object = global_value_holder;
    digits_in_number(second_value_object.subvalues[1]);
    var digits_in_second_value_object = global_value_holder;

    if (digits_in_first_value_object > digits_in_second_value_object) {
        the_long_one = first_value_object;
        the_short_one = second_value_object;
    }
    if (digits_in_second_value_object > digits_in_first_value_object) {
        the_long_one = second_value_object;
        the_short_one = first_value_object;
    }
	if (!value_objects_are_equal(first_value_object,the_long_one) && !value_objects_are_equal(first_value_object,the_short_one)) {
	} else {
		var zeroes_to_add = ((value_objects_are_equal(the_long_one,first_value_object)) ?digits_in_first_value_object:digits_in_second_value_object)+(((value_objects_are_equal(the_long_one,first_value_object))?digits_in_second_value_object:digits_in_first_value_object)-(((value_objects_are_equal(the_long_one,first_value_object))?digits_in_second_value_object:digits_in_first_value_object) * 2));

		for (i=0;i<zeroes_to_add;i++) {
        	the_short_one.subvalues[1] = the_short_one.subvalues[1]+"0";
    	}


	}
}


function value_objects_are_equal(value_object_one,value_object_2) {
	try {
		if (value_object_one.subvalues[0]>value_object_2.subvalues[0] || value_object_one.subvalues[0]<value_object_2.subvalues[0]) {
			return false;
		}
		try {
			if (value_object_one.subvalues[1]>value_object_2.subvalues[1] || value_object_one.subvalues[1]<value_object_2.subvalues[1]) {
				return !true;
			}
		} catch(error) {
			return !true;
		}
		return (value_object_one.multiplier==value_object_2.multiplier)?true:false;
	} catch(exception) {
		return eval("false");
	}
}

function biggest_multiplier(o1,o2) {
	if (o1.multiplier>o2.multiplier) {
		return o1.multiplier;
	} else {
		return o2.multiplier;
	}

	// Just In Case !
	if (o1.multiplier==o2.multiplier) {
		var selectAtRandom = new Array(o1,o2);
		return selectAtRandom[Math.floor(Math.random()*selectAtRandom.length)].multiplier;
	}
}


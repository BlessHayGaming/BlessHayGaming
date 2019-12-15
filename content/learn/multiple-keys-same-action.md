---
title: Multiple Keys for the Same Action
---

## Problem

Oftentimes we want to be able to check multiple optional keys to perform an action. This might be to control a character both with WASD and with the arrow keys, or maybe to allow pausing on both the P key and the Pause key. I see a lot of people handling it like this:

```gml
if (keyboard_check(vk_left) || keyboard_check(ord("A"))) {
	// Do something
}
```

This is of course fine in many cases, but it can turn into some very long conditionals sometimes. Also, if we want to change the controls at some point (or want to allow the player to do so), it becomes quite an inconvenience. 

## Solution

In GameMaker:Studio 2 you can define arrays like this:

```gml
var _array = ["index0", "index2", "etc."];
```

It is an easy way to pack multiple values into a variable. This does of course not help us directly, as `keyboard_check();` does not accept arrays as their argument, but what if we make our own script? A `keyboard_check_ext();` script? This would allow us to do something like this instead:

```gml
var _left = [vk_left, ord("A")];
if (keyboard_check_ext(_left)) {
	// Do something
}

// OR

if (keyboard_check_ext([vk_left, ord("A")])) {
	// Do something
}
```

Would that not be nice? We can even use a global or instance level variable to hold the mapped keys, changing them whenever we want to. But how would such script look?

First and foremost, we want to be able to use the script with singular input as well, so we start off the script by checking if our argument is an array, and if it is not, then we simple do a regular `keyboard_check();`.

```gml
var _array = argument0;
if (!is_array(_array)) {
	return keyboard_check(_array);
}
```

This also allows us to do a Ctrl + Shift + F in our project, and replace all uses of `keyboard_check();` with our new script, without anything breaking.

Next we get the length of the array and loop though it. For each element in the array we do a `keyboard_check();`, and if it returns true, then the loop ends there due to our `return`. After the loop we make sure to return 0, to let the user know that none of the keys are being pressed. A full script would look something like this:

```gml
/// keyboard_check_ext(array_with_keys);
/// @desc	Is one of multiple keys held down?
/// @arg	array_with_keys
var _array = argument0;
if (!is_array(_array)) {
	return keyboard_check(_array);
}

var _length = array_length_1d(_array);
for(var i=0; i<_length; i++){
	if (keyboard_check(_array[i])) {
		return 1;
	}
}
return 0;
```

Of course the exact same thing can be used for `keyboard_check_pressed();`, `keyboard_check_released();`, `keyboard_check_direct();`, `mouse_check_button_pressed();`, etc., simply by replacing the function used in the script.

I hope this script and tutorial helped you making even more awesome games, and please share it, if you know someone who could learn something from it.

Kind regards,<br>
Simon
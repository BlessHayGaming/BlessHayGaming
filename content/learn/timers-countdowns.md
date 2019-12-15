---
title: Timers and Countdowns in GMS2
---

## Introduction

Something I use often when making games are timers and countdowns. Sometimes it is enough to do a simple `my_timer++;` in the _Step_ event, but sometimes I need more precision. It is for those times I have made the following scripts for easily making timers and countdowns!

The timers and countdowns are initiated like so;

```gml
my_timer = timer_create();
my_countdown = countdown_create(10000);
```

They both function similarly, and are based around milliseconds. Only difference: Timers count up and countdowns count... down.

To update a timer or coundown, which you normally would do once every step, you simply use `timer_update(my_timer);` or `countdown_update(my_countdown);`, and to get the current time of the timer or countdown you use `timer_get(my_timer);` or `countdown_get(my_countdown);`. This will return how much time has passed for the timers, or how much time is left for the countdowns, both in milliseconds. Divide this with 1000 to get the value in seconds.

Towards the end of this post I will examplify a use and explain the choices behind the scripts, but first I will simply lay out all the scripts:
## Timer Scripts

```gml
///timer_create();
//Usage: my_timer = timer_create();
var _a;
_a[0] = 0;
return _a;
```

```gml
///timer_update(timer);
//Usage: timer_update(my_timer);
var _a = argument0;
_a[@ 0] += delta_time/1000;
return _a;
```

```gml
///timer_get(timer);
//Usage: time_passed = timer_get(my_timer);
var _a = argument0;
return _a[0];
```

```gml
///timer_set(timer,time);
//Usage: timer_set(my_timer,0);
var _a = argument0;
_a[@ 0] = argument1;
return _a;
```

```gml
///timer_add(timer,amt);
//Usage: timer_add(my_timer,1000);
var _a = argument0;
_a[@ 0] += argument1;
return _a;
```

```gml
///timer_subtract(timer,amt);
//Usage: timer_subtract(my_timer,1000);
var _a = argument0;
_a[@ 0] -= argument1;
return _a;
```

```gml
///timer_multiply(timer,scalar);
//Usage: timer_multiply(my_timer,2);
var _a = argument0;
_a[@ 0] *= argument1;
return _a;
```

```gml
///timer_divide(timer,val);
//Usage: timer_divide(my_timer,2);
var _a = argument0;
_a[@ 0] /= argument1;
return _a;
```

## Countdown Scripts

```gml
///countdown_create(ms);
//Usage: my_countdown = countdown_create();
var _a;
_a[0] = argument0;
return _a;
```

```gml
///countdown_update(countdown);
//Usage: countdown_update(my_countdown);
var _a = argument0;
_a[@ 0] -= delta_time/1000;
return _a;
```

```gml
///countdown_get(countdown);
//Usage: time_left = countdown_get(my_countdown);
var _a = argument0;
return _a[0];
```

```gml
///countdown_set(countdown,time);
//Usage: countdown_set(my_countdown,10000);
var _a = argument0;
_a[@ 0] = argument1;
return _a;
```

```gml
///countdown_add(countdown,amt);
//Usage: countdown_add(my_countdown,1000);
var _a = argument0;
_a[@ 0] += argument1;
return _a;
```

```gml
///countdown_subtract(countdown,amt);
//Usage: countdown_subtract(my_countdown,1000);
var _a = argument0;
_a[@ 0] -= argument1;
return _a;
```

```gml
///countdown_multiply(countdown,scalar);
//Usage: countdown_multiply(my_countdown,2);
var _a = argument0;
_a[@ 0] *= argument1;
return _a;
```

```gml
///countdown_divide(countdown,val);
//Usage: countdown_divide(my_countdown,2);
var _a = argument0;
_a[@ 0] /= argument1;
return _a;
```

## Example of use

Say we have a game where the room restarts every 60 seconds. A controller object could keep track of this, and be set up like this:

### Create event

```gml
restart_cd = countdown_create(60000);
```

### Step event

```gml
if !global.pause {
 countdown_update(restart_cd);
 if countdown_get(restart_cd) &lt;= 0 {
  room_restart();
 }
}
```

### Draw gui event

```gml
draw_text(10,10,string(ceil(countdown_get(restart_cd)/1000)));
```

The countdown will then keep counting down unless paused by the **global.pause** variable. The countdown will be drawn to the screen in seconds, and when the countdown reaches 0 the room will restart.

## Behind the Scripts

As you may notice I use one-value-arrays to store the timers and countdowns. This is simple because they have [**accessors**](https://docs.yoyogames.com/source/dadiospice/002_reference/001_gml%20language%20overview/accessors.html) (the @ I use when setting the array), which means you do not have to use the akward `my_timer = timer_update(my_timer);`. I did leave in returning the array though, in case that is the style you prefer.

A timer system could easily be made, where you do not need the update scripts. In fact, the first iterations of the scripts did not need them, since it was using [**current_time**](https://docs.yoyogames.com/source/dadiospice/002_reference/date%20and%20time/current_time.html) for the timing. However, I opted to use [**delta_time**](https://docs.yoyogames.com/source/dadiospice/002_reference/date%20and%20time/delta_time.html) instead, because this allows you to still use pause systems and generally gives more control - **current_time** would still keep counting no matter the state of the game! The **delta_time** still works across all room speeds and lag.

Hope you will find these scripts helpful!

Until next time,<br>
Simon
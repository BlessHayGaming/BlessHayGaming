---
title: Multiple Parents(ish)
---

## Problem

A question, which I have been asked multiple times concerning GameMaker, is “*how can I set two or more parent objects for my object?*” The answer, I typically answer, is “*you cannot*”, and for the longest of time I thought that to be how it is. But I recently figured out a darn simple way to *sorta* accomplish multiple parents for an object.

I write sorta, because it only partially works: You can have an object *inherit code* from multiple objects, but you cannot have the object be *referred to* as multiple parent objects.

### Example

Say we have two parent objects: *obj_parent1* and *obj_parent2*, and an object, *obj_child*, set to be a child of obj_parent1. Normally obj_child would inherit the code from obj_parent1, and if you referred to obj_parent1 in a **with** statement, then instances of obj_child would be counted as instances of obj_parent1 as well.

Using the simple method I am about to explain, obj_child can inherit the code from obj_parent2 as well, but if you refer to obj_parent2 in a **with** statement, then instances of obj_child will not be counted as instances of obj_parent2.

## Solution

When an object has a parent, and you wish to add code to an event in the child object, yet still have it inherit from the parent object, usually you would use `event_inherited();` before or after the added code in the child object. [From the manual:](http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.yoyogames.com%2Fsource%2Fdadiospice%2F002_reference%2Fobjects%2520and%2520instances%2Fobjects%2Fgenerating%2520events%2Fevent_inherited.html&t=MzZhYTc1YmVlZDg1MzQzMjZjZGVjYWMxMGVlYzU4YjhkOGFhNWZhOCx4RmtoMDJhRw%3D%3D&b=t%3AYODUev04FkhIjsE6Bbxb8Q&p=http%3A%2F%2Flearn.blesshaygaming.com%2Fpost%2F146904217845%2Fmultiple-parentsish-in-gamemaker-studio&m=0)

> *This function will call the current event of the parent object of the instance. […]*

To mimic this function but apply it with a secondary parent, we simply need to find a similar function, which can copy the currently executed event’s code but from another object of our choice. Luckily, [`event_perform_object();` does exactly that!](http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.yoyogames.com%2Fsource%2Fdadiospice%2F002_reference%2Fobjects%2520and%2520instances%2Fobjects%2Fgenerating%2520events%2Fevent_perform_object.html&t=OWRhYmVjYTRmNzA2OTJmNWRkZTgzNWZiN2I4ZWZmNjQ2OWZkNWE2MSx4RmtoMDJhRw%3D%3D&b=t%3AYODUev04FkhIjsE6Bbxb8Q&p=http%3A%2F%2Flearn.blesshaygaming.com%2Fpost%2F146904217845%2Fmultiple-parentsish-in-gamemaker-studio&m=0):

> *This functions works the same as event_perform() except that this time you can specify events from another object. There are many options here which allow complete simulation of all possible events, […]*
>
> *NOTE: Actions in the event called with this function are applied to the current instance, and not to instances of the given object.*

We hit the jackpot! The function takes three arguments: The object to get the code from, the type of the chosen event (ex. ev_create or ev_step) and the number (sub-type) of the chosen event (ex. ev_step_normal or ev_step_end). Since we just want the currently executed event, we can use the built-in variables [*event_type*](http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.yoyogames.com%2Fsource%2Fdadiospice%2F002_reference%2Fobjects%2520and%2520instances%2Fobjects%2Fgenerating%2520events%2Fevent_type.html&t=NTc3ZGQ5M2JhZjEzYzk5ZmQwZTIwMDQ4ODA2YWNjYzBmZDYyNGM3NCx4RmtoMDJhRw%3D%3D&b=t%3AYODUev04FkhIjsE6Bbxb8Q&p=http%3A%2F%2Flearn.blesshaygaming.com%2Fpost%2F146904217845%2Fmultiple-parentsish-in-gamemaker-studio&m=0) and [*event_number*](http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.yoyogames.com%2Fsource%2Fdadiospice%2F002_reference%2Fobjects%2520and%2520instances%2Fobjects%2Fgenerating%2520events%2Fevent_number.html&t=MzUzNjE3Y2MxY2E4ZDE3Y2RmYzE3OThjY2ZiYjIwYTBjYjEyMWNkMCx4RmtoMDJhRw%3D%3D&b=t%3AYODUev04FkhIjsE6Bbxb8Q&p=http%3A%2F%2Flearn.blesshaygaming.com%2Fpost%2F146904217845%2Fmultiple-parentsish-in-gamemaker-studio&m=0) to fill out the second and third argument, and all we are left with doing is select which object we want to ‘inherit’ from.

So: For our previous example, we want to put `event_perform_object(obj_parent2, event_type, event_number);` in all the events of obj_child, in which we want to inherit from obj_parent2. The events in obj_child could then look something like this:

```gml
event_inherited(); //Inheriting from obj_parent1
event_perform_object(obj_parent2, event_type, event_number);
```

But be mindful! The code will run in the order you type it in, so if obj_parent1 contains code to apply movement, but obj_parent2 contains code for setting the movement, you would probably want to inherit from obj_parent2 first.

### Extended Usage: Prototypes and State Machines

Another word, we could use instead of a secondary object, is the term *prototype*. This term covers objects, which will never actually be created in your game, but which contains code you need in other objects. An example usage of this could be for [state machines](https://www.youtube.com/watch?v=QSjDkpqZUSM). Here you could make a prototype object for each state (in this case we will just make a simple, general state machine, differentiating between being grounded, being in water, and being in the air):

> obj_player : The object using the state machine.
> proto_obj_on_ground : The player when on the ground.
> proto_obj_in_air : The player when in the air.
> proto_obj_in_water : The player when in water.

The step event for obj_player could then be as follows:

```gml
var __obj = noone;
if place_meeting(x, y, obj_water) {
 __obj = proto_obj_in_water;
} else if place_meeting(x, y+1, par_solid) {
 __obj = proto_obj_on_ground;
} else {
 __obj = proto_obj_in_air;
}

event_perform_object(__obj, event_type, event_number);
```

Even better: Other objects such as enemies can access the same prototypes, thus you don't have to repeat the same code across multiple objects!

#### Why Not Just Use Scripts?

Yes, you can do the same thing with scripts, I am not going to lie. Prototype objects are simply another place to put the code, and assuming you need different code for multiple different events, I (sometimes) prefer having it all gathered in an object, rather than using 4-5 different scripts. However, it all come down to preferences.

Anyway, that's all for this time. Hope you enjoyed this tutorial!

Kind regards,<br>
Simon
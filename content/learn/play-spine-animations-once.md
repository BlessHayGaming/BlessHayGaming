---
title: Play Spine Animation Tracks Exactly Once in GMS2
spine-version: v3.4.02
---

## The Problem

While GameMaker:Studio does have an _Animation end_ event, this event only reacts on the main _animation track_ (track 0), and not on all the other tracks. However, using the at-the-time-of-writing new _Animation event_ event, you can now easily make sure that specific animations on any track only play once.

![Animation Event](http://i.imgur.com/bWHVWCw.png)

## What to Do in Spine
The first thing you need to do, is setting up a "stop" event in your animation. You do this in Spine, as I showcase in the video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wg3QwMECoec?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
As the video explains:

* You first add the event to your hierarchy.

* You then key the event at the last frame of the animations you want to stop after playing once (or wherever you want the animation to stop).

These animations will typically be secondary animations, and rarely the animations you place on track 0, as you can simply use the *Animation end* event for these, as explained before.

After this you of course export your character and loads it into GameMaker:Studio as a skeletal sprite.

## What to Do in GameMaker:Studio

*As there has not yet been written a manual entry on the subject of the Animation event event at the time of writing, you will have to use [Nocturne's forum post on the topic](https://forum.yoyogames.com/index.php?threads/errors-with-spine.12934/#post-99143) for reference. Nocturne flesh out multiple other Spine-related updates in this post.*

When the sprite is added and attached to an object, we now add the *Animation event* event to the object as well. You find the event under the *Other* category. You then add a code block to the event.

The event is triggered by Spine events and automatically generates a *ds_map*. This *ds_map* is accessed through the variable `event_data` local to the event. The *ds_map* contains multiple keys, but for our purpose we only need two: The "name" key, to check if the current event is the "stop" event, and the "track" key, to check which *animation track* the animation is running on.

Let's begin writing the code. First we test for the correct event:

```
if event_data[? "name"] == "stop" {
}
```

Note that I use the *[accessor](https://docs.yoyogames.com/source/dadiospice/002_reference/001_gml%20language%20overview/accessors.html)* "?" to easily look inside the *ds_map*. After that we simply turn off the animation track in question by using [`skeleton_animation_clear();`](https://docs.yoyogames.com/source/dadiospice/002_reference/game%20assets/sprites/skeletal%20animations/skeleton_animation_clear.html):

```
if event_data[? "name"] == "stop" {
 skeleton_animation_clear(event_data[? "track"];
}
```

## ..and Voilá!

Now your animation will stop after playing exactly once! Yes, it is really that easy. Hope you enjoyed!

Regards,
Simon
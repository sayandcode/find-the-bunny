# find-the-bunny
This project was inspired by [this video](https://youtu.be/XEt09iK8IXs) on Ben Awad's channel, where he interviews Dan Abramov by asking him common CS interview questions.

<div style="text-align:center">
  <a href="https://youtu.be/XEt09iK8IXs">
    <img src="https://img.youtube.com/vi/XEt09iK8IXs/0.jpg" alt"Link to Ben Awad's video" width="50%" />
  </a>
</div>

In the interview, Ben asks a question about finding a rabbit from a series of holes in the ground. It goes like this:

> There are 100 holes in a line, and there is a rabbit hiding in one of the holes. Your job is to find the rabbit
>
> You can only look in one hole at a time, and every tim eyou look in a hole, the rabbit jumps to an adjacent hole.
>
> A good solution finds the right algorithm with the best big O; bonus points for providing the exact number of worst case searches for the 100 holes

I spent half of the video thinking, pausing and coming up with possible answers. The whole time I was either using a notepad (as Dan uses in the video). I worked along with the small clues that Ben gives Dan (the one about odd even holes, among others). Eventually I decided to walk away from the video (and the question) for a while, since I was in the middle of another project.

But I couldn't really shake the question off my head. That night when I was idling, I started thinking of possible solutions. I was away from my computer, so I didn't really have any means of visualising. So I decided to use my hands to do the job. Incidentally, this resulted in a breakthrough. 

Since I had drastically reduced the number of holes, from 100 to 5 (number of digits on a hand), I thought what the hell, lets reduce it even further.

### What if there's only one hole?
The bunny is right there, duh.

### What if there's two holes?
You guess one hole. If you don't find it, bunny's in the other hole. Otherwise, huzzah!

### What if there's three holes?
Aah. Now the plot thickens. Things aren't as simple as before, but still, theres some level of ease to this. As it turns out, when there are three holes, all you have to do is hang around in the middle hole. The bunny will eventually end up there, since it has to make a jump for each step of the game. I will, deterministically, find the bunny in two moves. That's the minimal reproducable example, nice! All I have to do now is make a pattern out of this.

### What if there's four holes?
Let's try using the earlier strategy of hanging around in a hole. I fool around a bit and then realize, all I have to do is alternate between the middle two holes. No matter where the bunny is, sooner or later, I end up catching it. So the strategy works!

### Five holes?
Ahah. Now what? I tried reasoning with this strategy for some time, before I realized that this is sufficient complexity that my fingers are not enough to represent all the cases. That's when I remembered [this game](https://www.mathsisfun.com/games/towerofhanoi.html) I came across a while ago, about the Towers of Hanoi. 
> *If you don't know what that is, check it out, it's a pretty cool game which uses recursive algorithms.* 

That game helped me a lot when I solved that problem. Having such an external interface allows you to focus on the core logic of solving the game/problem at hand, while the computer takes care of handling the current state of the game. I thought why don't I just build something like that! At the time of writing this very line, I now realize that I should have probably searched for such a game online before committing to building the whole thing from scratch. 😅😁 (*Although I think I did search for it, and decided to build this when I couldn't find something like it*)

And voila! You have this game. Now I haven't tried to solve the case for 5 holes and above yet. I will as soon as I finish writing this file. Hope this helps you solve the problem!

*Onward and upward*



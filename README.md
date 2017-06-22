###### One solution is to traverse input array from left and right and mark peaks
   
   * water = Sum(Min(LeftHeight,RightHeig) - height)

 

#

# Pleo React Challenge

We want you to create a user interface using React that solves the following problem.

## The problem

You are given a vector of heights, these heights form a structure like shown in the following figure.
 
![Figure 1](https://github.com/pleo-io/react-challenge/blob/master/figure1.png?raw=true "Figure 1")

Vector : **[2, 5, 1, 3, 1, 2, 1, 7, 7, 6]**
 
It is raining over the structure.  The water in one cell always flows to the neighboring cell of least height if it is not already occupied by water or a block. A sink is a cell with the property that water never flows away from it. All the neighboring cells that drains into a sink are said to form a basin. 
 
![Figure 2](https://github.com/pleo-io/react-challenge/blob/master/figure1.2.png?raw=true "Figure 2")
 
Observe that the structure is thereby partitioned into basins. Determine the number of unit of water contained in all basins.
In the example the input for this program is
[2, 5, 1, 3, 1, 2, 1, 7, 7, 6] and it should output 17

## The objective

The goal is to create the most optimal algorithm that given any array will output the correct units of water. Make a user interface using React to enter the values and visualize the solution.

## Instructions

Please fork this repo and make your solution there so we can track your solution.
We want to see your progression through commits (so don’t commit the entire solution in 1 commit), edit the README.md explaining your solution and the app.

Solutions for the algorithmic part of this assignment are possible to find online. Please be advised though that we really do expect you to try and solve this without just googling the solution. In the end the most interesting thing is not whether you have the _absolute most optimal_ algorithm, but rather your thought process and work process for how you arrived to your solution.

Therefore please also in your README.md explain not just what your solution is, but how it works and how you found it in terms of your work and thought process.

Happy hacking 😁!

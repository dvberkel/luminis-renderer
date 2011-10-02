#! /usr/bin/env python

import math
import string
import sys

sceneTemplate = "(scene [{0}])"
pointTemplate = "({0:f},{1:f},{2:f}), "

if __name__ == '__main__':
	numberOfPoints = int(sys.argv[1])

	accumulator = ""
	for index in range(0,numberOfPoints + 1):
		accumulator += pointTemplate.format(index, 0, 0);
		
	print sceneTemplate.format(accumulator[0:-2])

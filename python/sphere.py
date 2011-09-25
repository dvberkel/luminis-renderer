#! /usr/bin/env python

import math

if __name__ == '__main__':
	maximum = 50
	angle = 2 * math.pi / maximum
	for index in range(0,maximum):
		x = index * angle
		print x;

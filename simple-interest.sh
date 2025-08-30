#!/bin/bash
# Simple Interest Calculator

echo "Enter Principal Amount:"
read P
echo "Enter Rate of Interest (in %):"
read R
echo "Enter Time (in years):"
read T

# Calculate Simple Interest
SI=$((P * R * T / 100))

echo "Simple Interest is: $SI"

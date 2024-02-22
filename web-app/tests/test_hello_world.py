# tests/test_hello_world.py
import pytest

def test_greeting_count_increases(hello_world):
    initial_count = hello_world.getGreetingCount()
    hello_world.sayHelloTo("Alice")
    assert hello_world.getGreetingCount() == initial_count + 1

def test_get_greeting(hello_world):
    hello_world.sayHelloTo("Bob")
    name, _ = hello_world.getGreeting(0)
    assert name == "Bob"


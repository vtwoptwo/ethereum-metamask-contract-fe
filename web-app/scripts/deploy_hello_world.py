from brownie import HelloWorld, accounts

def call_say_hello(hello_world):
    # Call the sayHello function
    greeting = hello_world.sayHello.call()
    print(f"The contract greets: {greeting}")

    # Call the sayHelloTo function with a name
    personalized_greeting = hello_world.sayHelloTo.call("Brownie")
    print(f"The contract personally greets: {personalized_greeting}")

def deploy_hello_world():
    account = accounts[0]  # Use the first account from the list of accounts
    # Deploy the HelloWorld contract
    hello_world = HelloWorld.deploy({'from': account})
    print(f"Contract deployed to {hello_world.address}")
    return hello_world  

def main():
    hello_world = deploy_hello_world()
    call_say_hello(hello_world)

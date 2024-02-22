from brownie import HelloWorld

def main():
    for contract in HelloWorld:
        print(f"Contract {contract} is deployed at: {contract.address}")

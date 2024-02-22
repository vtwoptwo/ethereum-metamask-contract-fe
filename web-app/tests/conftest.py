import pytest


accounts = ["0xC02C07491afa1D90aBC901F2e08B902f398298a9"]

@pytest.fixture
def hello_world(HelloWorld):
    return HelloWorld.deploy({'from': accounts[0]})
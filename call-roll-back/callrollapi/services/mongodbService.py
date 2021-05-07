from flask import Flask
from flask_pymongo import pymongo

"""
    MongoDB
"""
client = pymongo.MongoClient("mongodb+srv://call-roll:PFE2021@cluster0.qb3g6.mongodb.net/call_roll_database?retryWrites=true&w=majority")
db = client.call_roll_db


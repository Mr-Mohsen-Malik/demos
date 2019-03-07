import sys
import os
import pandas as pd
import subprocess
import argparse
import pdb
import pickle
from setup import setup_environment


sql = """INSERT INTO users(name)
             VALUES('{}') RETURNING id;"""

name = input("please enter you name to register: ")
# Make PostgreSQL Connection
engine = setup_environment.get_database()
try:
    con = engine.raw_connection()
    curr = con.cursor()
    curr.execute(sql, (name))
    #print(curr.fetchone())
    id = curr.fetchone()[0]
    print("Congrats, you have been register.\n you id is",id)
    curr.close()
except (Exception) as error:
	print(error)
finally:
	if con is not None:
		con.close()


# import psycopg2
# import sys, os
# import numpy as np
# import pandas as pd
# import cred as creds
# import pandas.io.sql as psql


# ## ****** LOAD PSQL DATABASE ***** ##


# # Set up a connection to the postgres server.
# conn_string = "host="+ creds.PGHOST +" port="+ "5432" +" dbname="+ creds.PGDATABASE +" user=" + creds.PGUSER \
# +" password="+ creds.PGPASSWORD
# conn=psycopg2.connect(conn_string)
# print("Connected!")

# # Create a cursor object
# cursor = conn.cursor()


# def load_data(schema, table):

#     sql_command = "SELECT * FROM {}.{};".format(str(schema), str(table))
#     print (sql_command)

#     # Load the data
#     data = pd.read_sql(sql_command, conn)

#     print(data.shape)
#     return (data)
import hashlib
import json
import sys
import mysql.connector


def hash_string(string):
    return hashlib.md5(string.encode('utf-8')).hexdigest()


if __name__ == '__main__':

    if len(sys.argv) == 3 and sys.argv[1].lower() == '-hash':
        print(hash_string(sys.argv[2]))
        exit(0)

    elif len(sys.argv) == 3 and sys.argv[1].lower() == '-confirm':
        with open('db/dbconfig.json') as f:
            dbconfig = json.load(f)
        cnx = mysql.connector.connect(host=dbconfig["host"], user=dbconfig["user"], password=dbconfig["password"],
                                      database=dbconfig["database"])
        cursor = cnx.cursor()
        cursor.execute("SELECT id, email FROM User")
        result = cursor.fetchall()

        for row in result:
            if hash_string(row[1]) == sys.argv[2]:
                cursor.execute("UPDATE User SET confirmed=1 WHERE id=" + str(row[0]))
                cnx.commit()
                print("User {0} confirmed".format(row[0]))
                exit(0)
        print("Token not found")
        cnx.close()

    elif len(sys.argv) == 5 and sys.argv[1].lower() == '-reset':
        with open('db/dbconfig.json') as f:
            dbconfig = json.load(f)
        cnx = mysql.connector.connect(host=dbconfig["host"], user=dbconfig["user"], password=dbconfig["password"],
                                      database=dbconfig["database"])
        cursor = cnx.cursor()
        cursor.execute("SELECT id, email, password FROM User")
        result = cursor.fetchall()

        for row in result:
            if hash_string(row[1]) == sys.argv[2] and hash_string(row[2]) == sys.argv[3]:
                cursor.execute(f"UPDATE User SET password={sys.argv[4]} WHERE id={row[0]}")
                cnx.commit()
                print(f"OK")
                exit(0)
        print("Token not found")
        cnx.close()

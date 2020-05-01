import smtplib
import json
import sys


class Mailer:

    def __init__(self, config_path='python_modules/mailerconfig.json'):
        with open(config_path) as f:
            self._subject = None
            self._message = None
            self._recipient_address = None
            config = json.load(f)
            self._sender_email = config["sender_email"]
            self._sender_password = config["sender_password"]
            self._smtp = config["smtp"]

    def fit(self, subject, message, recipient_address):
        self._subject = subject
        self._message = message
        self._recipient_address = recipient_address

    def send(self):
        try:
            server = smtplib.SMTP('smtp.gmail.com:587')
            server.ehlo()
            server.starttls()
            server.login(self._sender_email, self._sender_password)
            message = 'Subject: {}\n\n{}'.format(self._subject, self._message)
            server.sendmail(self._sender_email, self._recipient_address, message)
            server.quit()
            print("Success: Email sent!")
        except:
            print("Email failed to send.")


if __name__ == '__main__':
    if len(sys.argv) != 4:
        raise Exception("set command line arguments: subject, message, recipient_address.")

    mailer = Mailer()
    mailer.fit(sys.argv[1], sys.argv[2], sys.argv[3])
    mailer.send()
    exit(0)

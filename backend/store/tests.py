import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Email credentials
sender_email = "snap@bebra.club"
sender_password = "iLLUMINATOR57"

# Receiver email
receiver_email = "olegSuper58@gmail.com"

# Create message container
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = "Test email from Python"

# Email body
body = "This is a test email sent from Python."
msg.attach(MIMEText(body, 'plain'))

# Connect to SMTP server (Gmail)
server = smtplib.SMTP('mailu.bebra.club', 465)
server.starttls()

# Login to Gmail
server.login(sender_email, sender_password)

# Send email
text = msg.as_string()
server.sendmail(sender_email, receiver_email, text)

#

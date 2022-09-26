# e-commerce_project
To activate JWT, private-public keys should be generated.
to do so, after opening the backend directory
please use the following commands:
openssl genrsa -out private-key.pem 3072
openssl rsa -in private-key.pem -pubout -out public-key.pem

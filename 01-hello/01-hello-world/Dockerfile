FROM alpine

RUN mkdir app
WORKDIR app

# ADD will add files from the host machine into a location in the container
# First arg is Host path
# Second arg is docker container path

ADD . .

CMD ["./hello-world"]

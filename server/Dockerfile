# create image from the official Go image
FROM golang:alpine

RUN apk add --update tzdata \
    make bash wget curl git gcc musl-dev;

# Create binary directory, install glide, fresh and goose
RUN mkdir -p $$GOPATH/bin && \        
    curl https://glide.sh/get | sh && \
    go get -u github.com/pilu/fresh

# define work directory
ADD . /go/src/github.com/diegoprates/siteware-test/server
WORKDIR /go/src/github.com/diegoprates/siteware-test/server

# serve the app
CMD glide update && fresh -c runner.conf main.go
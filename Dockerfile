FROM ubuntu:14.04

# Download packages
RUN apt-get update && apt-get install -y curl \
                                         git  \
                                         build-essential \
					nginx \
					sudo

# Copy angular files
Run mkdir /home/app
COPY . /home/app
COPY default.conf /etc/nginx/conf.d
RUN rm -r /etc/nginx/sites-enabled
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
# Installation
#RUN curl -sL https://deb.nodesource.com/setup | bash -

WORKDIR /home/app
RUN npm install -g bower
RUN npm install -g gulp
RUN npm cache clean
RUN npm install
RUN bower --allow-root install -g

# Building
RUN gulp build
RUN mkdir /var/www
RUN cp -r /home/app/dist/* /var/www
RUN rm -r /home/app

EXPOSE 1000
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

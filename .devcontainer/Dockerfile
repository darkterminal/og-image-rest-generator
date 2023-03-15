FROM debian:bullseye

ARG NODE_VERSION=16.17.0

RUN apt-get update; apt install -y curl python-is-python3 pkg-config fontconfig build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION}

#######################################################################

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production
ENV PATH /root/.volta/bin:$PATH

ENV FONTCONFIG_PATH /etc/fonts
COPY fonts ./
RUN mkdir -p /usr/share/fonts/truetype
RUN install -m644 ./*.ttf /usr/share/fonts/truetype/
RUN rm ./*.ttf

# configure Fontconfig to use the new fonts
RUN echo "export FONTCONFIG_PATH=/etc/fonts" >> /etc/profile
RUN fc-cache -f -v

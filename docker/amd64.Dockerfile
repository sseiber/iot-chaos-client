FROM amd64/nginx

RUN rm /etc/nginx/conf.d/*
RUN echo 
# ADD proxy/.well-known /usr/share/nginx/html/.well-known
# ADD proxy/ssl /etc/nginx/ssl
ADD proxy/nginx.conf /etc/nginx/nginx.conf
ADD proxy/nginx.conf /etc/nginx/conf.d/default.conf

ADD dist /usr/share/nginx/html/dist

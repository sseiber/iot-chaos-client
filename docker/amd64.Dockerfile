FROM amd64/nginx

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN echo 

# ADD proxy/.well-known /usr/share/nginx/html/.well-known
# ADD proxy/ssl /etc/nginx/ssl

COPY proxy/nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/share/nginx/html/dist

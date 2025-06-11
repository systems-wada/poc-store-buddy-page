FROM eclipse-temurin:21

ARG USERNAME=ubuntu
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG NODE_MAJOR=20

# RUN groupadd -f --gid $USER_GID $USERNAME || echo "Group ${USER_GID} already exitsts" \
#   && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME  || echo "User ${USERNAME} already exitsts" \

# RUN apt-get update\
#   && apt-get install -y sudo locales git procps openssh-client socat zip ca-certificates curl gnupg \
#   && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#   && chmod 0400 /etc/sudoers.d/$USERNAME

RUN apt-get update\
  && apt-get install -y sudo locales git procps openssh-client socat zip ca-certificates curl gnupg \
  && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0400 /etc/sudoers.d/$USERNAME

# Install Node.js LTS
RUN apt-get install nodejs npm -y \
  && npm install n -g -y \
  && n lts \
  && apt-get purge -y nodejs npm

RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

# Install Node.js LTS
# RUN sudo -E apt-get install nodejs npm -y
# RUN sudo -E npm install n -g -y
# RUN sudo -E n lts
# RUN sudo -E apt-get purge -y nodejs npm

# Install packages
WORKDIR /workspaces

# Adjust permissions for the Gradle directory
# RUN mkdir -p .gradle && chmod -R 777 .gradle

USER $USERNAME

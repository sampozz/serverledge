FROM registry.gitlab.polimi.it/ai-sprint/toscarizer/ai-sprint-base

RUN mkdir /opt/videosearcher
RUN mkdir /mnt/ramdisk

WORKDIR /opt/videosearcher

# Copy requirements files
COPY ./figaro/videosearcher/ffmpeg2/requirements.* /opt/videosearcher/

# Instal system requirements first
RUN touch requirements.sys && \
    apt update && \
    xargs apt install -y --no-install-recommends < requirements.sys  && \
    apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && rm -rf ~/.cache/

# Update pip and install python requirements
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy application and onnx models
COPY ./figaro/videosearcher/ffmpeg2/ /opt/videosearcher/

# TODO: WHAT TO RUN?
# RUN chmod +x /opt/videosearcher/script.sh
CMD python3 /opt/videosearcher/executor.py

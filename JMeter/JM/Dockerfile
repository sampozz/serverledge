FROM openjdk:11-slim

# Set environment variables
ENV JMETER_VERSION=5.5
ENV JMETER_HOME=/opt/apache-jmeter-${JMETER_VERSION}
ENV PATH=$JMETER_HOME/bin:$PATH

# Install dependencies
RUN apt-get update && \
    apt-get install -y wget unzip && \
    apt-get clean

# Download and install JMeter
RUN wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-${JMETER_VERSION}.tgz && \
    tar -xzf apache-jmeter-${JMETER_VERSION}.tgz -C /opt && \
    rm apache-jmeter-${JMETER_VERSION}.tgz

# Install JMeter plugins manager
# RUN wget https://jmeter-plugins.org/get/ -O ${JMETER_HOME}/lib/ext/plugins-manager.jar && \
#     wget https://repo1.maven.org/maven2/kg/apc/cmdrunner/2.2/cmdrunner-2.2.jar -O ${JMETER_HOME}/lib/cmdrunner-2.2.jar

# Install JMeter Plugins Manager and required plugins
RUN wget https://jmeter-plugins.org/get/ -O ${JMETER_HOME}/lib/ext/plugins-manager.jar && \
    wget https://repo1.maven.org/maven2/kg/apc/cmdrunner/2.3/cmdrunner-2.3.jar -O ${JMETER_HOME}/lib/cmdrunner-2.3.jar && \
    java -cp ${JMETER_HOME}/lib/ext/plugins-manager.jar org.jmeterplugins.repository.PluginManagerCMDInstaller && \
    ${JMETER_HOME}/bin/PluginsManagerCMD.sh install jpgc-casutg,jpgc-tst

# Create directories for test plans, results and logs
RUN mkdir -p /jmeter/scripts /jmeter/results /jmeter/logs

# Copy scripts from the host to the container
COPY scripts/ /jmeter/scripts/
COPY jmeter.properties ${JMETER_HOME}/bin/

# Set working directory
WORKDIR /jmeter

# Entry point
ENTRYPOINT ["jmeter"]
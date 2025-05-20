rm result.log
rm -rf report-folder
jmeter -n -t ~/serverledge/jmeter/testload.jmx -l ~/serverledge/jmeter/result.log -e -o report-folder
@echo off

CMD /C npm install
cd server
CMD /C npm install

echo "Done" 
echo "Use npm start command to start the server"
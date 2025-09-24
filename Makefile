
install: 
	npm run build
	clean_frontend_iot
	scp -r build/* microsistemas@191.101.235.212:/home/microsistemas/dev_backend_medidores/public
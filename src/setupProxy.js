module.exports = (app) => {
	app.use((_, res, next) => {
		res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
		res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
		next()
	})
}
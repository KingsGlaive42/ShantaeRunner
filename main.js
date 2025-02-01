const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./ShantaeCharge.png");
ASSET_MANAGER.queueDownload("./ShantaeGlide.png");
ASSET_MANAGER.queueDownload("./ShantaeSlide.png");
ASSET_MANAGER.queueDownload("./ShantaeJump.png");
ASSET_MANAGER.queueDownload("./ShantaeFall.png");
ASSET_MANAGER.queueDownload("./Assets.png");
ASSET_MANAGER.queueDownload("./Background.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);
	new SceneManager(gameEngine);

	gameEngine.start();
});

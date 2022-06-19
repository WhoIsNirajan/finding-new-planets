var rocket
var meteor 
var star
var back_ground
var score = 0 
var obstialesGroup 

var gameState = "play" 
function preload(){
hero = loadImage("Rocket.png");
meteor = loadImage("Meteor.png"); 
star = loadImage("Star.png");
back_ground = loadImage("background.png");


}

function setup() {
 createCanvas(600, 600)
 bg0 = createSprite(300, 300)
 bg0.addImage("back_ground", back_ground)
 bg0.velocityY=1

 rocket = createSprite(175, 500, 10, 10)
 rocket.addImage("rocket", hero)
 rocket.scale = 0.05

obstaclesGroup = new Group()
starsGroup = new Group()
}


function draw() {
 background(0)
 

 // if statements
 if (gameState === "play") {

 if (keyDown(LEFT_ARROW)) {
  rocket.x = rocket.x - 3 
 }

 if (keyDown(RIGHT_ARROW)) {
    rocket.x = rocket.x + 3
 }

 if (keyDown("space")) {
    rocket.velocityY = -10
 }
rocket.velocityY = rocket.velocityY + 0.8
 if (bg0.y>400) {
 bg0.y=300    
 }

 // spawn funtions
 spawnObstacles()
 spawnStars()
 if (obstaclesGroup.isTouching(rocket)) {
    rocket.velocityY = 0
    bg0.velocityY = 0
    gameState = "end"
 }

 if (starsGroup.isTouching(rocket)) {
    score = score + 10
    starsGroup.destroyEach()
 }

 if (rocket.y>600) {
    rocket.destroy()
    gameState = "end"
 }
 
 drawSprites()
 textSize(25)
 fill("white")
 text("score : " + score, 350, 50)
 
}
if (gameState === "end") {
    fill("red")
    textSize(30)
    text("Game Over!!", 300, 300)
} }
function spawnObstacles(){
  if (frameCount%180 === 0) {
    var obstacle = createSprite(200, 50)
    obstacle.x = Math.round(random(50, 500))
    obstacle.addImage(meteor)
    obstacle.scale = 0.05
    obstacle.velocityY = 1
    rocket.depth = obstacle.depth
    rocket.depth += 1
    obstacle.lifetime = 800
    obstaclesGroup.add(obstacle)
  }
}

function spawnStars(){
    if (frameCount%100 === 0) {
        var star1 = createSprite(100, 100)
        star1.x = Math.round(random(25, 550))
        star1.addImage(star)
        star1.scale = 0.07
        star1.velocityY = 1
        rocket.depth = star1.depth 
        rocket.depth += 1 
        star1.lifetime = 800
        starsGroup.add(star1)     
    }
}

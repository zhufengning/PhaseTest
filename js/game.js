w=window.innerWidth
h=window.innerHeight
var player
/*if(w>1920||h>1080)
{
    w=1920
    h=1080
}*/

var lx,ly,x,y
document.onmousedown=md
document.ontouchstart=mdt
document.onmouseup=mu
document.ontouchend=mut
document.ontouchmove=tm

function md(event)
{
    lx=event.x
    ly=event.y
    x=lx;y=ly
}

function mu(event)
{
    x=event.x;
    y=event.y;
    move()
}

function mdt(event)
{
    lx=event.touches[0].clientX;
    ly=event.touches[0].clientY;
}

function mut(event)
{
    move()
}

function move()
{
    if((lx-x)>=50)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if((lx-x)<=-50)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0)
        player.anims.play('turn',true)
    }
}

function tm(event)
{
    x=event.touches[0].clientX
    y=event.touches[0].clientY
}
var config={
    type:Phaser.AUTO,
    width: w,
    height:h,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update
    },
    transparent:true
}

var game=new Phaser.Game(config)

function preload(){
    this.load.image('img_back','img/back.svg')
    this.load.image('img_wall','img/wall.svg')
    this.load.image('img_btn','img/btn.png')
    this.load.spritesheet('s_player','img/player_s.png',{frameWidth:100,frameHeight:100})
}

function create(){
    //console.log(this.add.button.constructor)
    
    wall=this.physics.add.staticGroup();
    wall.create(w/2,h/5*4,'img_wall').setScale(1).refreshBody()
    player = this.physics.add.sprite(w/2,h/5*4-100,'s_player')
    player.setBounce(0)
    player.setCollideWorldBounds(true)
    this.anims.create({
        key: 'left',
        frames: [{key:'s_player', frame:0}],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 's_player', frame: 1 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: [{key:'s_player', frame:2}],
        frameRate: 10,
        repeat: -1
    });
    this.physics.add.collider(player, wall);
    //button=this.add.button
}

function update(){

}

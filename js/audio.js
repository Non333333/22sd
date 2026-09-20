class GameAudio {
  constructor(){
    this.ctx=null;this.master=null;this.bgmOn=true;this.seOn=true;this.voiceOn=true;this.bgmTimer=null;this.bgmMode="home";this.voices=[];
    if("speechSynthesis" in window){this.voices=speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>this.voices=speechSynthesis.getVoices();}
  }
  async unlock(){
    if(!this.ctx){const Ctx=window.AudioContext||window.webkitAudioContext;if(Ctx){this.ctx=new Ctx();this.master=this.ctx.createGain();this.master.gain.value=.24;this.master.connect(this.ctx.destination);}}
    if(this.ctx&&this.ctx.state==="suspended")await this.ctx.resume();
    if(this.bgmOn)this.startBGM(this.bgmMode);
  }
  tone(freq=440,dur=.08,vol=.12,type="sine"){
    if(!this.ctx||!this.seOn)return;const now=this.ctx.currentTime;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(vol,now+.01);g.gain.exponentialRampToValueAtTime(.0001,now+dur);o.connect(g);g.connect(this.master);o.start(now);o.stop(now+dur+.03);
  }
  click(){this.tone(520,.055,.075,"triangle");setTimeout(()=>this.tone(700,.05,.05,"triangle"),45);}
  confirm(){this.tone(523,.08,.08);setTimeout(()=>this.tone(659,.09,.07),70);setTimeout(()=>this.tone(784,.12,.06),140);}
  negative(){this.tone(210,.11,.08,"sawtooth");}
  startBGM(mode="home"){
    this.bgmMode=mode;if(!this.ctx||!this.bgmOn)return;this.stopBGM();
    const palettes={pregnancy:[261.63,329.63,392,329.63],home:[293.66,369.99,440,369.99],happy:[329.63,392,493.88,392],sad:[220,261.63,329.63,261.63],hospital:[246.94,293.66,369.99,293.66],ending:[261.63,392,523.25,392]};
    const notes=palettes[mode]||palettes.home;let i=0;
    const play=()=>{if(!this.ctx||!this.bgmOn)return;const now=this.ctx.currentTime;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type="sine";o.frequency.value=notes[i%notes.length]/2;g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.025,now+.18);g.gain.exponentialRampToValueAtTime(.0001,now+1.9);o.connect(g);g.connect(this.master);o.start(now);o.stop(now+2);i++;};
    play();this.bgmTimer=setInterval(play,1850);
  }
  stopBGM(){if(this.bgmTimer){clearInterval(this.bgmTimer);this.bgmTimer=null;}}
  setBGM(on){this.bgmOn=on;if(on)this.startBGM(this.bgmMode);else this.stopBGM();}
  setSE(on){this.seOn=on;}
  setVoice(on){this.voiceOn=on;if(!on&&"speechSynthesis" in window)speechSynthesis.cancel();}
  speak(text,speaker="child"){
    if(!this.voiceOn||!("speechSynthesis" in window)||!text)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="ja-JP";u.rate=.95;u.pitch=speaker==="child"?1.25:speaker==="mother"?1.08:.9;const jp=this.voices.find(v=>/ja/i.test(v.lang));if(jp)u.voice=jp;speechSynthesis.speak(u);
  }
}
window.gameAudio=new GameAudio();

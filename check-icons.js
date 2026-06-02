const l = require('lucide-react');
const keys = Object.keys(l);
const r = keys.filter(function(k){ 
  if(k.indexOf('Video') > -1) return true;
  if(k.indexOf('Play') > -1) return true;
  if(k.indexOf('Link') > -1) return true;
  if(k.indexOf('Globe') > -1) return true;
  if(k.indexOf('Mail') > -1) return true;
  if(k.indexOf('Camera') > -1) return true;
  if(k.indexOf('Film') > -1) return true;
  if(k.indexOf('Share') > -1) return true;
  if(k.indexOf('At') > -1) return true;
  if(k.indexOf('Music') > -1) return true;
  if(k.indexOf('Hash') > -1) return true;
  return false;
});
console.log(r.join(', '));

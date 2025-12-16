async function retardant(delay=5500) { 
  return new Promise(resolve => setTimeout(resolve , delay));
}

export default retardant;

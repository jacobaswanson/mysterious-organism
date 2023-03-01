// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum,
      dna,
      mutate() {
        let randomIndex = Math.floor(Math.random() * this.dna.length);
        let randomBase;
        do {
          randomBase = returnRandBase();
          if(this.dna[randomIndex] === returnRandBase()) {
            continue;
          } else {
            this.dna[randomIndex] = randomBase;
            break;
        }
      } while (this.dna[randomIndex] === returnRandBase);
      return this.dna;
    },
    compareDNA(specimen) {
      let likeDNA = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(specimen.dna[i] === this.dna[i]) {
          likeDNA += 1;
        }
      }
      console.log(`specimen #${this.specimenNum} and specimen #${specimen.specimenNum} have ${(likeDNA / this.dna.length * 100).toFixed(2)}% DNA in common`)
    },
    willLikelySurvive() {
      let count = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') {
          count += 1;
        }
      }
      if((count / this.dna.length) * 100 < 60) {
        return false;
      } else {
        return true;
      }
    },
    complementStrand() {
      let complementary = [];
      complementary = this.dna.map(x => {
        switch(x) {
          case 'A':
            return 'T';
            break;
          case 'T':
            return 'A';
            break;
          case 'C':
            return 'G';
            break;
          case 'G':
            return 'C';
            break;
        }
      });
      return complementary;
    }
  }
  }
  
  const createSpecimens = (numOfSpecimens) => {
    let batch = [];
    for(let i = 1; i <= numOfSpecimens; i++){
      batch.push(pAequorFactory(i, mockUpStrand()));
    }
    return batch;
  }
  
  /*
  // creates a batch of specimens, number passed in specifies the number of specimens
  
  const batch = createSpecimens(30);  
  console.log(batch);
  
  // creates 2 numbered specimens
  const specimen1 = pAequorFactory(1, mockUpStrand());
  const specimen2 = pAequorFactory(2, mockUpStrand());
  
  //compares specimen1 DNA to specimen2 DNA and logs the % match
  specimen1.compareDNA(specimen2);
  
  // mutates a single random base of specimen1's DNA array
  console.log(specimen1.mutate());
  
  // returns true if the strand is 60% or more 'C's or 'G's
  specimen1.willLikelySurvive();
  
  // returns the 'complementary strand' of DNA for the given specimen
  console.log(specimen1.complementStrand());
  */
  
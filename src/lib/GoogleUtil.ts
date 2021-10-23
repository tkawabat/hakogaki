class GoogleUtil {
    signIn!: () => void;
    signOut!: () => void; 
    
    init(signIn:() => void, signOut: () => void) {
        this.signIn = signIn;
        this.signOut = signOut;
    }
    
}

export default new GoogleUtil()

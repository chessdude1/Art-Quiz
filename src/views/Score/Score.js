class Score {
    constructor(resolvedCards, allCards){
        this.resolvedCardsStore = resolvedCards
        this.allCards = allCards
    }
    render () {
        
        return `
        <div class="bodyScorePage">
        <header class="headerLogo">
            <img class="headerLogoImg" src="./images/Common/logo.svg">
        </header>
        <main class="mainScorePage">
            <div class="CategoriesHeader">
                <div class="CategoriesHeader__HomeBtn">
                    <img src="./images/Categories/Home.svg">
                    <p>HOME</p>
                </div>
                <h2 class="CategoriesHeader__Header">SCORE</h2>
                <div class="ScorePageHeader__Category">
                    <img src="./images/Score/Category.svg">
                    <p>CATEGORY</p>
                </div>
            </div>
            <div class="ScoreCardsContainer">
                <div class="ScoreCard ScoreCardResolved" ScoreCardId='1'>
                    <div class="ScoreCard__head">
                        <p class="ScoreCard__Name">name</p>
                        <p class="ScoreCar__Status">true</p>
                    </div>
                    <img class="ScoreCardImage" src="./images/pictures/1.jpg">
                    <div class="ScoreCard__Modal">
                        <div class="ScoreCard__Info">
                            <p>1</p>
                            <p>2</p>
                        </div>
                    </div>
                </div>
            </div>

    </div>
    </main>
    <footer class="footerScore">
        <div class="Score_leftButton">
            <img src="./images/Score/LeftBtn.svg">
        </div>
        <div class="Score_NumberOfPage">1/20</div>
        <div class="Score_RightButton">
            <img src="./images/Score/NextBtn.svg">
        </div>
    </footer>
        `
    }
}


let arrOfResolvedCards = []


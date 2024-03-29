
export default function NavSection(props){
    const {section} = props

    const sectionTitle = Object.keys(section)[0]
    const sectionName = sectionTitle.replace(" ","")
    const sectionId = '#'+sectionName

    return(
        <>
            
            <div className="accordion mx-2 my-1" id = "section-accordion">
                <div className="accordion-item green-bckgr text-center py-1 px-2">
                    <p className="accordion-header" data-bs-toggle= "collapse" data-bs-target = {sectionId} >

                        {sectionTitle.toUpperCase()}

                    </p>
                </div>
                {section[sectionTitle].length >0 && /* if there are no subsections, don't render collapsable part of the accordion*/
                    <div id = {sectionName} className="accordion-collapse collapse show ">
                        <div className = "accordion-body p-1">
                            { section[sectionTitle].map((item, index) =>{
                                const words = item.split(" ")
                                const subsection = words.map((word) =>{
                                    return word[0].toUpperCase()+word.substring(1)
                                }).join(" ")

                                return <p key = {index}>{subsection}</p>})
                            }
                        </div>                    
                    </div>
                }
            </div>
            
            
        </>
    )
}
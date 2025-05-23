import { render } from "@testing-library/react"
import { Home } from "lucide-react"


describe("Home Page", () => {
    it("renders the ContactPage component", () => {
        render(<Home />)
    })
})
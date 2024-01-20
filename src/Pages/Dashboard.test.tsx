import { render, screen, fireEvent, waitFor, act, getByRole } from "@testing-library/react";
import Dashboard from "./Dashboard";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux'; // Import Provider for wrapping the component
import { legacy_createStore as createStore } from 'redux'
const mockStore = createStore(() => ({ mode: 'light' }));

jest.mock("axios");



const mockResponse = [{
    word: 'hello',
    meanings: [
        {
            partOfSpeech: 'interjection',
            definitions: [{ definition: 'used as a greeting or to attract attention', example: "" }],
            synonyms: ["hfjk", "jjkeh", "hkjf"],
            antonyms: ["bhjbe", "jbjkf", "jbjke"],


        },
    ],
    pronunciation: "dfghj",
    definition: "iuygf",
    phonetics: [{ audio: "http://sample" }]
}];

describe("Dashboard", () => {
    beforeEach(() => {
        jest.spyOn(axios, "get").mockResolvedValue({
            data: mockResponse
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Initial Render", () => {
        render(<Provider store={mockStore}>
            <Dashboard />
        </Provider>);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "can" } });
        expect(input).toHaveValue("can");
    })

    test("handle state on clicking word", async () => {


        render(<Provider store={mockStore}>
            <Dashboard />
        </Provider>);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        const wordbtn = screen.getByTestId("words");
        userEvent.click(wordbtn);
        await waitFor(() => {
            expect(screen.queryByTestId('modal')).toBeInTheDocument();

        });

    })

    test("calling handle Submit on form submit", async () => {

        (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });
        render(<Provider store={mockStore}>
            <Dashboard />
        </Provider>);
        const input = screen.getByRole("textbox");

        const submitbtn = screen.getByTestId("form");

        fireEvent.change(input, { target: { value: "can" } });
        act(() => fireEvent.submit(submitbtn));

        await waitFor(() => expect(screen.queryByTestId('modal')).toBeInTheDocument());

    })

    test('handles API request failure', async () => {


        const mockError = { message: 'Unable to fetch response' };
        (axios.get as jest.Mock).mockRejectedValue(mockError);
        // jest.spyOn(axios, "get").mockRejectedValue(mockError);
        render(<Provider store={mockStore}>
            <Dashboard />
        </Provider>);


        const input = screen.getByLabelText('search by word');
        const submitButton = screen.getByText(/submit/i);
        screen.debug();
        fireEvent.change(input, { target: { value: 'can' } });
        act(() => fireEvent.click(submitButton));
        screen.debug();
        await waitFor(async () => {

            const errorNotification = await screen.findByTestId('notify-component');
            expect(errorNotification).toBeInTheDocument();
        }, { timeout: 1000 })
    });

})
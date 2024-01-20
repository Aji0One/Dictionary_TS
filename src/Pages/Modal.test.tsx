import { act, render, screen } from "@testing-library/react";
import TransitionsModal from "./Modal";
import userEvent from "@testing-library/user-event";

describe("Modal", () => {
    const stateHandle = jest.fn();
    const state: boolean = true;
    const content = {
        word: 'hello',
        meanings: [
            {
                partOfSpeech: 'interjection',
                definitions: [{ definition: 'used as a greeting or to attract attention', example: ["dfghj", "dfghj"] }],
                synonyms: ["hfjk", "jjkeh", "hkjf"],
                antonyms: ["bhjbe", "jbjkf", "jbjke"],

            },
        ],
        phonetics: [{ audio: "http://sample" }]
    };

    test("initial rendering", () => {
        render(<TransitionsModal state={state} setState={stateHandle} content={content} />);
        const myword = screen.getByTestId("myword");
        expect(myword).toBeInTheDocument();

        const track = screen.getByTestId("audio");
        expect(track).toBeInTheDocument();

        const info = screen.getByTestId("info");
        expect(info).toBeInTheDocument();
    })

    test("testing the click function in the modal", async () => {

        render(<TransitionsModal state={state} setState={stateHandle} content={content} />);

        // const audioTrack = screen.getByTestId("audio-track");
        // fireEvent.click(audioTrack, audioHandle());
        // expect(audioHandle).toHaveBeenCalledTimes(1);

        const myModal = screen.getByTestId("mymodal");
        act(() => userEvent.keyboard('{Escape}'));

        expect(myModal).toBeInTheDocument();
    })


})
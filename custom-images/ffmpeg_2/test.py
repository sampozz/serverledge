import function

def test_ffmpeg():
    # Mock parameters
    params = {
        'dir': '1234',
    }
    
    # Mock context (if needed)
    context = None
    
    # Call the function
    result = function.handler(params, context)
    
    # Check the result
    assert result == params, "Nope"
    
    print("Test passed!")


if __name__ == "__main__":
    test_ffmpeg()